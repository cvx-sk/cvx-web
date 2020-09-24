<template>
    <b-card no-body id="nav-cotnaier">
        <b-nav pills card-header slot="header" v-b-scrollspy:nav-scroller>
            <b-nav-item-dropdown text="O nás" right-alignment boundary="window">
                <b-dropdown-item href="#kto_sme" @click="scrollIntoView">Kto sme?</b-dropdown-item>
                <b-dropdown-divider></b-dropdown-divider>
                <b-dropdown-item href="#kto_sme_1" @click="scrollIntoView">Celosvetové spoločenstvo</b-dropdown-item>
                <b-dropdown-item href="#kto_sme_2" @click="scrollIntoView">Krstná spoločnosť na Malte</b-dropdown-item>
                <b-dropdown-item href="#kto_sme_3" @click="scrollIntoView">Vzťah Spoločenstva CVX-CLC a rehole Spoločnosti Ježišovej</b-dropdown-item>
                <b-dropdown-item href="#kto_sme_4" @click="scrollIntoView">Spolupráca s rehoľnými sestrami Congregatio Jesu</b-dropdown-item>
            </b-nav-item-dropdown>
            <b-nav-item href="#charizma" @click="scrollIntoView">Charizma</b-nav-item>
            <b-nav-item href="#status" @click="scrollIntoView">Štatút</b-nav-item>
        </b-nav>

        <b-card-body
            id="nav-scroller"
            ref="content">
            <h4 id="kto_sme">Kto sme?</h4>
            <p>Sme laické spoločenstvo kresťanov, mužov a žien, dospelých i mladých  zo všetkých spoločenských vrstiev, ktorí chcú vernejšie nasledovať Ježiša Krista a spolupracovať s Ním na budovaní Kráľovstva a ktorí považujú Spoločenstvo kresťanského života CVX za svoje konkrétne povolanie v rámci Cirkvi.</p>
            <p>Za charakteristický prameň a nástroj našej spirituality považujeme Duchovné cvičenia sv. Ignáca. Naše povolanie nás pozýva žiť spiritualitu, ktorá nás otvára a disponuje na všetko, čo si Boh praje v každej konkrétnej situácii nášho života.<p>
            <p>Zvlášť si uvedomujeme, že dôležitými prostriedkami pri hľadaní a nachádzaní Boha vo všetkom je modlitba, osobné rozlišovanie a rozlišovanie v spoločenstve, denné spytovanie svedomia a duchovné sprevádzanie.</p>
            <blockquote class="blockquote">
                <p class="mb-0">„Vezmi Pane a prijmi celú moju slobodu, moju pamäť, môj rozum a celú moju vôľu. Všetko, čo mám a čo vlastním, je Tvoje. Nakladaj s tým úplne podľa Tvojej vôle, daj mi len svoju lásku a milosť, lebo tá mi postačí.“</p>
                <footer class="blockquote-footer">modlitba sv. Ignáca z Loyoly</footer>
            </blockquote>
            <h5 id="kto_sme_1">Celosvetové spoločenstvo</h5>
            <p>CVX - CLC je celosvetové spoločenstvo, ktorého výkonné centrum je v súčasnosti v Ríme a pôsobí v takmer 60 krajinách po celom svete. Je pokračovaním Mariánskych kongregácií, ktoré inicioval Jean Leunis, SJ a ktoré prvýkrát schválil pápež Gregor XIII. bulou Omnipotentis Dei 5. decembra 1584. Naše počiatky vidíme v tých skupinách laikov, ktoré sa vyvinuli po roku 1540 v rôznych častiach sveta na základe iniciatívy svätého Ignáca z Loyoly a jeho spoločníkov. Všeobecné princípy Spoločenstva kresťanského života CVX boli prijaté v roku 1971 a revidované v roku 1990.</p>
            <ul>
                <li>História v skratke: <b-link href="https://drive.google.com/file/d/18P3DyEfDm7XhCAKv-I1XXvt-5fXkQD5b/view?usp=sharing" target="_blank">CLC - história</b-link></li>
                <li>Svetové CVX - CLC: <b-link href="http://www.cvx-clc.net/" target="_blank">www.cvx-clc.net</b-link></li>
                <li>Európske CVX - CLC: <b-link href="http://clc-cvx.eu/" target="_blank">clc-cvx.eu</b-link></li>
            </ul>
            <h5 id="kto_sme_2">Krstná spoločnosť na Malte</h5>
            <p>Momentálne sme v prístupovom procese do celosvetového spoločenstva CVX-CLC a našou krstnou spoločnosťou je Malta. Pomáhajú nám riešiť otázky spoločenstva, modlia sa za nás, dávajú  nám podporu a keď dokončíme prístupové prípravy potrebujeme ich odporúčanie na vstup do celosvetového spoločenstva.</p>
            <p>Zástupcovia Maltskej leader komunity nás každý rok navštívia na komunitnom víkende a aktívne sa zapájajú do diania spoločenstva. Taktiež nás pravidelne pozývajú na ich národné zhromaždenie, ktoré sa koná každý rok na jeseň v  exercičnom dome St. Joseph.</p>
            <ul>
                <li>Krstná spoločnosť na Malte: <b-link href="https://www.facebook.com/ChristianLifeCommunityMalta/" target="_blank">Christian Life Community - CLC Malta</b-link></li>
            </ul>
            <h5 id="kto_sme_3" class="mb-0">Vzťah Spoločenstva CVX-CLC a rehole Spoločnosti Ježišovej</h5>
            <p class="mt-0"><i>(Societas Jesu)</i></p>
            <p>Vznik Mariánskych kongregácií inicioval páter Jean Leunis SJ a celá história ich činnosti a apoštolátu je previazaná s jezuitskou rehoľou vo svete ako aj na Slovensku. Mariánske kongregácie od svojho vzniku až po súčasnosť (už ako Spoločenstvo CVX-CLC) podporujú a spolupracujú na dielach rehole jezuitov, a naopak, rehoľa jezuitov podporuje a spolupracuje na dielach Spoločenstva CVX-CLC. Nakoľko Spoločenstvo CVX-CLC je od rehole nezávislé laické dielo, táto spolupráca bola v dejinách a v jednotlivých krajinách rôznorodá, ale veľmi plodná. K tomuto odkazu sa jednoznačne hlási aj Spoločenstvo CVX na Slovensku, ktoré je otvorené spolupráci s jezuitskou rehoľou na dielach svojich ako aj na dielach rehole. Spolupracujeme s Jezuitskou rehoľou a neoddeliteľnou súčasťou nášho spoločenstva je ekleziálny asistent, ktorý je garantom žitia ignaciánskej spirituality a dodržiavania Charizmy a Všeobecných princípov a pravidiel Spoločenstva CVX-CLC. Momentálne túto funkciu zastrešuje páter Bernard Mišovič SJ.</p>
            <ul>
                <li>Jezuitská rehoľa: <b-link href="https://jezuiti.sk/" target="_blank">jezuiti.sk</b-link></li>
            </ul>
            <h5 id="kto_sme_4">Spolupráca s rehoľnými sestrami Congregatio Jesu</h5>
            <p>Nakoľko máme rovnakú spiritualitu a vyvinuli sa medzi nami aj priateľské vzťahy, spolupracujeme aj so sestrami CJ a to tak, že niektoré sestry individuálne sprevádzajú našich členov, jedna sestra sprevádza na stretku, a občas sestry sprevádzajú na duchovných cvičeniach. My im pomáhame tak, že sprevádzame na online duchovných obnovách počas pôstu a v advente. Je to veľmi obohacujúca spolupráca.</p>
            <ul>
                <li>Rehoľné sestry Congregatio Jesu: <b-link href="https://www.congregatiojesu.com/" target="_blank">www.congregatiojesu.com</b-link></li>
            </ul>
            <h4 id="charizma">Charizma</h4>
            <p>{{ text }}</p>
            <h4 id="status">Štatút</h4>
            <p>{{ text }}</p>
        </b-card-body>
    </b-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
// import HelloWorld from '@/components/HelloWorld.vue' // @ is an alias to /src

@Component({
    components: {
    // HelloWorld
    },
})
export default class About extends Vue {
  text = 'TODO';

  mounted() {
      const hash = window.location.hash;
      if (hash) this.scrollIntoView(hash);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  scrollIntoView(evt: any) {
      // evt.preventDefault()
      const href = typeof evt === 'string' ? evt : evt?.target?.getAttribute('href');
      const el = href ? document.querySelector(href) : null;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if (el) (this.$refs.content as any).scrollTop = el.offsetTop;
  }
}
</script>

<style lang="scss">
#nav-cotnaier {
    height: 100%;
    .card-header {
      padding: 0.2rem 0.8rem;
      .nav-link {
          padding: 0.1rem 0.5rem;
      }
      .nav-pills .nav-link.active,
      .nav-pills .show > .nav-link,
      .dropdown-item.active, .dropdown-item:active {
          background-color: #42b983;
      }
      ul.dropdown-menu.show {
        max-width: 100%;
        a.dropdown-item {
          width: 100%;
          overflow-y: hidden;
        }
      }
    }
    .blockquote {
        font-size: 1rem;
        font-style: italic;
        color: #0d7948;
    }
}
#nav-scroller {
    position:relative;
    height: 100%;
    overflow-y: scroll;
    li {
        text-align: left;
    }
    h4, h5 {
        margin-top: 2rem;
    }
}
</style>
