<template>
    <b-container id="form">
        <b-row>
            <b-col>
                <h5>Prihlasovanie</h5>
                <b-button v-if="loading" variant="primary" disabled>
                    <b-spinner small></b-spinner>
                    Loading...
                </b-button>
                <b-alert v-if="error" show variant="danger" class="cb" dismissible @dismissed="error=null">
                    <b>Error<small v-if="error.statusCode"> [{{error.statusCode}}]</small>:</b> {{ error.message }}
                </b-alert>
                <div v-if="config" class="content">
                    <h1>{{config.title.nominative}}</h1>
                    <h3>{{config.date.from_pretty}} až {{config.date.to_pretty}} {{config.destination.name}}</h3>
                    <b-form @submit="onSubmit" class="inline-left">
                        <div class="headerbanner" role="heading">
                            <div><div>Základné údaje</div></div>
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 10 10" preserveAspectRatio="none">
                                    <polygon points="0,0 10,0 0,10"></polygon>
                                </svg>
                            </div>
                        </div>
                        <b-form-group label="Prishlasujete sa ako:">
                            <b-form-radio-group v-model="model.person_type" >
                                <b-form-radio :value="[0]">muž</b-form-radio>
                                <b-form-radio :value="[1]">žena</b-form-radio>
                                <b-form-radio :value="[0,1]">manželia</b-form-radio>
                            </b-form-radio-group>
                       </b-form-group>
                        <b-form-input
                            v-for="i in model.person_type"
                            :key="i"
                            v-model="model.name[i]"
                            :state="validating && !!model.name[i].trim().length"
                            :placeholder="model.person_type.length == 1 ? 'Krstné meno' : ['Meno nuža','Meno ženy'][i]"
                            trim
                            ></b-form-input>
                    </b-form>
                    <!-- <b-alert v-if="!subscribed" show variant="warning" class="cb">
                        Prihlasovanie bude čoskoro spustené,<br/>
                        zadajte svoj email a dostanete notifikáciu, keď sa bude dať prihlásiť.
                    </b-alert>
                    <b-alert v-if="subscribed" show variant="success" class="cb">
                        Výborne, notifikáciu pošleme na email <strong>{{subscribed}}</strong>
                    </b-alert>
                    <b-input-group>
                        <b-input-group-prepend is-text>
                            <b-icon-envelope/>
                        </b-input-group-prepend>
                        <b-form-input
                            type="email"
                            v-model="email"
                            name="email"
                            variant="outer-danger"></b-form-input>
                        <b-input-group-append>
                            <b-button size="sm"
                                text="Button"
                                variant="success"
                                :disabled="subscribeDisabled"
                                @click="subscribe">
                                <b-spinner small v-if="subscribing"></b-spinner>
                                <b>Uporozniť ma</b>
                            </b-button>
                        </b-input-group-append>
                    </b-input-group> -->
                </div>
            </b-col>
        </b-row>
    </b-container>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import axios from 'axios';

// TODO create comman types
const enum Genus { masculine='M', feminine='F', middle='m' }
interface ConfigType {
    formCode: string;
    title: {
        nominative: string;
        accusative: string;
        genitive: string;
        genus: Genus;
        plural: boolean;
    };
    date: {
        from: Date;
        to: Date;
        end: Date;
        from_pretty: string;
        to_pretty: string;
        end_pretty: string;
    };
    destination: {
        name: string;
        details: string;
        navigation: string;
        coordinates: string;
    };
    with_children: boolean;
    with_animators: boolean;
    limit: number;
    noteHint: string;
    allow_partial_partake: boolean;
    price: {
      full: {
        night: number;
        breakfast: number;
        lunch: number;
        dinner: number;
        fee: number;
      };
      reduced: {
        night: number;
        breakfast: number;
        lunch: number;
        dinner: number;
        fixed: number;
      };
      for_private_room: number;
      free_to_age: number;
      reduced_to_age: number;
    };
    ask: {
      group_info: boolean;
      attended_in_history: boolean;
    };
    code_explain: string;
    share_transport_table: string;
    style: {
      background_image_url: string;
      background_color: string;
      title_color: string;
      component_color: string;
    };
}


@Component({
    components: {},
})
export default class Form extends Vue {
    loading = false;
    email = '';
    config: null | ConfigType = null;
    error: null | { message: string; statusCode?: number; } = null;
    subscribing = false;
    subscribed = '';
    validating = null;
    model = {
        person_type: [0],
        name: [null, null],
    };

    created() {
        this.fetchData();
    }

    @Watch('$routey')
    async fetchData() {
        if (this.config && this.config.formCode === this.$route.params.code) return;

        const storagate = this.$route.query.keep === null
            ? JSON.parse(sessionStorage.getItem('form_config') || '{}') : null;
        if (storagate && storagate[this.$route.params.code]) {
            Object.assign(this, storagate[this.$route.params.code]);
            return;
        }

        this.error = this.config = null;
        this.loading = true;
        try {
            const response = await axios.get(`/api/form-api?code=${this.$route.params.code}`);
            this.config = response.data;
            console.log(response);
        } catch (error) {
            this.error = error;
            console.log(error, error.response && error.response.data);
        } finally {
            this.loading = false;
        }

        if (storagate) {
            sessionStorage.setItem('form_config', JSON.stringify({
                [this.$route.params.code]: {
                    config: this.config,
                    error: this.error,
                },
            }));
        }
    }

    get subscribeDisabled() {
        return this.subscribing ||
            this.subscribed === this.email ||
            !this.email ||
            !/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(this.email);
    }

    async onSubmit() {
        this.subscribing = true;
        try {
            const response = await axios.post(`/api/form-api?code=${this.$route.params.code}`, {
                action: 'preregister',
                input: this.email,
            });
            if (response.data.status === 'ok') this.subscribed = this.email;
            else if (response.data.statusCode >= 400) {
                this.error = response.data.message;
            }
        } catch (error) {
            this.error = error.response && error.response.data && error.response.data.message
                ? error.response.data : { message: error.message };
            console.log(error.response, error);
        } finally {
            this.subscribing = false;
        }
    }
}
</script>

<style lang="scss">
    #form {
        padding-top: 1em;
        .cb {
            color: rgb(46, 46, 46);
        }
        .spinner-border {
            margin: 0em 0.5em 0.1em 0em;
        }
        .inline-left {
            display: inline-block;
            text-align: left;
        }
    }
    .content {
        background-color: rgba(248, 248, 255, .8);
        padding: 0 2% 0 2%;
        min-width: 382px;
        max-width: 600px;
        margin-left: auto;
        margin-right: auto;
    }
    .ui-dialog .content {
        min-width: auto;
    }
    .jumbotron {
        text-align: center;
        top: 0;
        left: 15%;
        right: 15%;
    }
    h1 {
        font-size: 4vw;
        color: whitesmoke;
        text-shadow: 0 0 8px #000000;
        line-height: 100%;
    }
    h1 small { font-size: 2.8vw; }

    .headerbanner {
        margin-left: -34px;
        display: flex;
        padding-top: 12pt;
    }
    .headerbanner div:nth-child(1) {
        min-width: 0px;
        color: whitesmoke;
        text-shadow: 0 0 4px #000000;
    }
    .headerbanner div:nth-child(1) div {
        padding: 8px 16px 8px 32px;
    }
    .headerbanner div:nth-child(1) div::after{
        content: ":";
    }
    .headerbanner.result div:nth-child(1) div::after{
        content: ".";
    }
    .headerbanner div:nth-child(2) {
        width: 18px;
        position: relative;
        flex-shrink: 0;
        overflow: hidden;
    }
    .headerbanner div:nth-child(2) svg {
        height: 100%;
        position: absolute;
        overflow: visible;
        width: 90%;
    }
    .headerbanner div:nth-child(1), .headerbanner div:nth-child(2) svg > polygon {
        box-shadow: -1px 1px 1px #5e5e5e;
        // background-color: <?= props.componentColor ?>;
        // fill: <?= props.componentColor ?>;
    }
    .row {
        margin: 10px 0;
        justify-content: center;
        display: flex;
        flex-wrap: wrap;
    }
    .row.inline {
        margin: 0;
        justify-content: flex-start;
    }
    input[readonly] { cpolor: silver; }
    div input:nth-child(2) { margin-left: 10px; }
    .label, .required { text-align: right; }
    .label > span, .required > span { display: inline-block; padding-right: 8pt; }
    .label > span::after { content: ":"; }
    .required > span::before { content: "*"; color: red; }
    .row .col-1 { flex: 0 0 8.33333%; max-width: 8.33333%; }
    .row .col-2 { flex: 0 0 16.66666%; max-width: 16.66666%; }
    .row .col-3 { flex: 0 0 25%; max-width: 25%; }
    .row .col-4 { flex: 0 0 33.33333%; max-width: 33.33333%; }
    .row .col-5 { flex: 0 0 41.66666%; max-width: 41.66666%; }
    .row .col-6 { flex: 0 0 50%; max-width: 50%; }
    .row .col-7 { flex: 0 0 58.33333%; max-width: 58.33333%; }
    .row .col-8 { flex: 0 0 66.66666%; max-width: 66.66666%; }
    .row .col-9 { flex: 0 0 75%; max-width: 75%; }
    .row .col-10 { flex: 0 0 83.33333%; max-width: 83.33333%; }
    .row .col-11 { flex: 0 0 91.66666%; max-width: 91.66666%; }
    .row .col-12 { flex: 0 0 100%; max-width: 100%; }
    button {
        font-size: 12pt;
        margin: 4pt;
        // background-color: <?= props.componentColor ?>;
        color: whitesmoke;
        padding: 4px 16px;
        border: none;
        outline: none;
        box-shadow: 1px 1px 2px #5e5e5e;
        border-radius: 4px;
        cursor: pointer;
    }
    button.inline {
        margin: 0;
        padding: 0;
        font-size: 0;
    }
    button:disabled {
        color: #a9a9a9;
        font-style: italic;
        cursor: default;
    }
    button:hover:enabled, button.hover:enabled {
        color: white;
        text-shadow: 0 0 4px #000000;
    }
    button:active, button.active {
        box-shadow: 0px 0px 2px #5e5e5e;
    }

    table.input_grid > thead > tr > th {
        vertical-align: bottom;
        font-weight: initial;
    }
    table.input_grid > thead > tr > * > div {
        writing-mode: tb-rl;
        transform: rotate(-180deg);
    }
    table.input_rec { border-collapse: collapse; }
    table.input_rec th {
        font-weight: normal;
        color: #5e5e5e;
    }
    table.input_rec td, table.input_rec th {
        border: 1px solid #afd9ee;
        padding: 1px 4px;
    }
    span#formType {
        display: inline-block;
        border-width: 1px;
        border-style: solid;
        border-radius: 4px;
        padding: 1pt 3pt;
        border-color: transparent;
    }
    input.error, textarea.error, span.error, select.error {
        border: 1px solid orangered;
        border-color: orangered !important;
        background-color: lavenderblush;
    }

    .ui-widget input, .ui-widget {
        font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
        font-size: 12pt;
    }
    .ui-widget input {
        font-size: 11px;
    }
    .ui-tooltip {
        background-color: lightgoldenrodyellow;
        box-shadow: 3px 3px 4px #d3d3d3;
        font-size: small !important;
    }

    .editable .row button { display: none; }
    .editable .row:hover button { display: inline-block; }
    .editable .row .digest { padding-top: 1px; display: inline-block; border-bottom: 1px dotted white; }
    // .editable .row:hover .digest { border-bottom-color: <?= props.componentColor ?>; }
    input.tiny { width: 1em; }

    .hr {
        // background-color: <?= props.componentColor ?>;
        height: 2px;
        width: 100%;
        margin-top: 20px;
        box-shadow: -1px 1px 1px #5e5e5e;
    }
    input.normal { width: 45%; }
    textarea, input.big { width: 95%; }

    .no-title .ui-dialog-titlebar {
        display: none;
    }
    #errorMessage {
        border: 1px solid orangered;
        border-radius: 5px;
    }
    .footer {
        padding-bottom: 50px;
        text-align: center;
        display: block;
        padding-top: 20px;
    }
    .footer, .footer a {
        color: #e0e0e0;
    }
    .success, .revert {
        display: none;
    }
    div.spreadsheet {
        display: inline-block;
        background-color: white;
        background-image: url(//ssl.gstatic.com/docs/spreadsheets/favicon_jfk2.png);
        background-repeat: no-repeat;
        background-position: 4px 4px;
        padding: 4px 4px 4px 24px;
        font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
        font-size: small;
        border-radius: 4px;
    }
    ul { margin-top: 8px; }
</style>
