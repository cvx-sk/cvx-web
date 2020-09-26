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
                <div v-if="data" class="content">
                    <h1>{{ data.title.nominative }}</h1>
                    <h3>{{data.date.from_pretty}} až {{data.date.to_pretty}} {{data.destination.name}}</h3>
                    <b-alert v-if="!subscribed" show variant="warning" class="cb">
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
                    </b-input-group>
                </div>
            </b-col>
        </b-row>
    </b-container>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import axios from 'axios';

// TODO create comman types
type Rod = 'mužský' | 'ženský' | 'stredný';
interface ConfigType {
    title: {
        nominative: string;
        accusative: string;
        genitive: string;
        genus: Rod;
        isPlural: boolean;
    };
    destination: string;
    destinationDetails: string;
    navigation: string;
    date: { from: Date; dateTo: Date; };
    componentColor: string;
    titleColor: string;
    backgroundUrl: string;
    backgroundColor: string;
    publicUrl: string;
    limit: string;
    dateEnd: Date;
    transportShare: string;
    withChildren: boolean;
    withAnimators: boolean;
    partialPartake: boolean;
    gps: string;
    transferCode: string;
    transferCodeExplain: string;
    nightPrice: number;
    nightHalfPrice: number;
    breakfastPrice: number;
    breakfastHalfPrice: number;
    lunchPrice: number;
    lunchHalfPrice: number;
    dinnerPrice: number;
    dinnerHalfPrice: number;
    fixedPrice: number;
    fixedHalfPrice: number;
    freeAge: number;
    childAge: number;
    noteHint: string;
    groupInfo: boolean;
    privateRoomPrice: number;
}


@Component({
    components: {},
})
export default class Form extends Vue {
    loading = false;
    email = '';
    data: null | ConfigType = null;
    error: null | { message: string; statusCode?: number; } = null;
    subscribing = false;
    subscribed = '';

    created() {
        this.fetchData();
    }

    @Watch('$routey')
    async fetchData() {
        if (this.data && this.data.transferCode === this.$route.params.code) return;

        this.error = this.data = null;
        this.loading = true;
        try {
            const response = await axios.get(`/api/form-api?code=${this.$route.params.code}`);
            this.data = response.data;
            console.log(response);
        } catch (error) {
            this.error = error;
            console.log(error, error.response && error.response.data);
        } finally {
            this.loading = false;
        }
    }

    get subscribeDisabled() {
        return this.subscribing ||
            this.subscribed === this.email ||
            !this.email ||
            !/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(this.email);
    }

    async subscribe() {
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
    }
</style>
