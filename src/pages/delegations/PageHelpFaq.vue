
<!--
SPDX-License-Identifier: EUPL-1.2
(C) Copyright 2019-2020 Regione Piemonte
-->
<template>
  <q-page padding class="csi-page-delegations-faq">


    <q-card class="q-mt-md">
      <q-list no-border separator class="no-padding">
        <q-collapsible sparse label="1.  A chi è rivolto questo servizio?">
          <div>
            Il servizio “Gestione deleghe” è destinato a ogni <strong>assistito regionale</strong> (delegante) che
            intende abilitare un
            altro cittadino adulto (delegato) a operare sui servizi on line a proprio nome.
          </div>
        </q-collapsible>

        <q-collapsible sparse label="2.  A cosa serve il servizio Gestione deleghe?">
          <div>
            Il servizio “Gestione deleghe” permette a un cittadino adulto di proporre una delega, analogamente a quanto
            si
            può fare presso lo sportello dell’ASL.
          </div>
        </q-collapsible>

        <q-collapsible sparse label="3.  Per quali servizi si può esprimere la delega?">
          <div>
            Al momento può essere delegato il servizio <i>“Ritiro referti e Immagini”</i>.
          </div>
        </q-collapsible>

        <q-collapsible sparse label="4.  Come accede ai servizi il delegato?">
          <div>
            Il soggetto delegato (anche non piemontese o non italiano) deve seguire i seguenti passi:
            <ul>
              <li>deve accedere al portale <i>La mia salute</i></li>
              <li>selezionare un servizio e autenticarsi con le credenziali SPID</li>
              <li>
                essere riconosciuto come delegato di un assistito adulto piemontese per operare su quel servizio a suo
                nome (infatti il delegato può scegliere di operare per se stesso o per uno dei deleganti che lo hanno
                autorizzato).
              </li>
            </ul>
          </div>
        </q-collapsible>

        <q-collapsible sparse label="5.  La delega per un adulto è subito valida?">
          <div>
            La delega inserita da un cittadino adulto è subito attiva e il delegato può operare immediatamente per conto
            del delegante.
          </div>
        </q-collapsible>

        <q-collapsible sparse label="6.	Posso limitare i servizi al delegato adulto?">
          <div>
            Certo, puoi decidere di limitare l’utilizzo di alcuni servizi e impedire la visibilità dei dati
          </div>
        </q-collapsible>

        <q-collapsible sparse label="7.  C’è un limite massimo di delegati?">
          <div>
            Si, il numero di delegati consentiti per ogni cittadino è definito dal sistema.
          </div>
        </q-collapsible>

        <q-collapsible sparse label="8.	Il delegato adulto deve accettare la delega per renderla attiva?">
          <div>
            No, non è necessario: infatti il conferimento di una delega è un negozio unilaterale recettizio con cui un
            soggetto delegante conferisce al delegato il potere di rappresentarlo
          </div>
        </q-collapsible>

        <q-collapsible sparse label="9.	Il delegato adulto può rifiutare una delega?">
          <div>
            Sì, il delegato può rinunciare alla delega inserita dal delegante con l’apposita funzione “Rinuncia”.
          </div>
        </q-collapsible>

        <q-collapsible sparse label="10.	Il cittadino delegante adulto può annullare una delega inserita?">
          <div>
            Sì, il delegante può revocare una delega inserita in precedenza.
          </div>
        </q-collapsible>

        <q-collapsible sparse label="11.	È possibile richiedere la gestione di una delega a uno sportello ASL?">
          <div>
            Sì. Se un cittadino / assistito si rivolge allo sportello dell’ASL per presentare le varie richieste,
            l’operatore amministrativo può:
            <ul>
              <li>inserire una nuova delega</li>
              <li>rinnovare o revocare una delega già presente</li>
              <li>inserire una dichiarazione di responsabilità genitoriale e una delega per minore.</li>
            </ul>
          </div>
        </q-collapsible>

        <q-collapsible sparse label="12.	Un cittadino non assistito in Piemonte può inserire una delega?">
          <div>
            No. Il servizio “Gestione Deleghe” non permette a un cittadino non assistito da una ASL piemontese
            l’inserimento di una delega verso terzi; può invece essere delegato e quindi consultare o rifiutare le
            deleghe presenti a suo nome.
          </div>
        </q-collapsible>

        <q-collapsible sparse label="13.	Le deleghe hanno una scadenza?">
          <div>
            Si, la validità di una delega è definita dal sistema: il sistema avverte il delegato della imminente
            scadenza della delega in modo che possa provvedere per tempo al rinnovo.
          </div>
        </q-collapsible>

        <q-collapsible sparse label="14.	Quali dati devo conoscere per delegare qualcuno?">
          <div>
            Se intendi delegare un altro cittadino devi conoscere e inserire questi dati identificativi obbligatori:
            <ul>
              <li>nome</li>
              <li>cognome</li>
              <li>codice fiscale</li>
              <li>data di nascita</li>
              <li>comune di nascita</li>
              <li>sesso</li>
            </ul>
          </div>
        </q-collapsible>

        <q-collapsible sparse label="15.	Dove posso vedere le deleghe inserite da me?">
          <div>
            Attraverso la funzionalità “Chi hai delegato” puoi visualizzare l’elenco delle deleghe che hai proposto in
            qualità di delegante a favore di altri cittadini (delegati). Puoi anche filtrare le deleghe e verificarne lo
            stato:
            <ul>
              <li>inserita</li>
              <li>scaduta</li>
              <li>revocata dal delegante</li>
              <li>rinuncia del delegato</li>
            </ul>
          </div>
        </q-collapsible>

        <q-collapsible sparse label="16.	Dove posso inserire una nuova delega per adulto?">
          <div>
            Nella sezione “Chi hai delegato” con la funzione “Nuova delega”.
          </div>
        </q-collapsible>

        <q-collapsible sparse label="17.	Dove posso vedere le deleghe richieste da terzi nei miei confronti?">
          <div>
            La funzionalità “Chi ti ha delegato” permette di visualizzare l’elenco delle deleghe per cui sei stato
            proposto come delegato da altri cittadini (deleganti): puoi anche filtrarle e verificarne lo stato:
            <ul>
              <li>inserita</li>
              <li>scaduta</li>
              <li>revocata dal delegante</li>
              <li>rinuncia del delegato</li>
            </ul>
          </div>
        </q-collapsible>

        <q-collapsible sparse label="18.	Come posso rinunciare a deleghe richieste da terzi nei miei confronti?">
          <div>
            È sufficiente consultare la funzionalità “Chi ti ha delegato” che permette di visualizzare l’elenco
            delle deleghe per cui sei stato proposto come delegato. Se intendi rifiutare puoi farlo
            con la funzione “Rinuncia”.
          </div>
        </q-collapsible>

        <q-collapsible sparse label="19.	Come posso sapere se un mio delegato sta operando a mio nome su un servizio?">
          <div>
            Il sistema traccia tutte le operazioni effettuate dalle persone che hai delegato e ti invia le notifiche di
            accesso in base alle preferenze che hai impostato (e-mail, sms, push, BOT...).
          </div>
        </q-collapsible>

        <q-collapsible sparse label="20.	Come posso inserire una nuova delega per un minore?">
          <div>
            Puoi inserire una nuova dichiarazione di responsabilità genitoriale utilizzando la funzionalità “Gestione
            minori”, e poi selezionando l’opzione “Nuova dichiarazione” che guida all’inserimento di una nuova
            dichiarazione di responsabilità genitoriale e di una delega minore.
            Il servizio permette di certificare la propria responsabilità genitoriale (affidata ad entrambi genitori ai
            sensi dell’art. 316 del c.c., come sostituito dal D. Lgs. n. 154/2013) ed ottenere delega ed abilitazione ad
            accedere, per conto dei propri figli minorenni, ai servizi telematici disponibili nell’ambito
            dell’Ecosistema dei servizi della Sanità offerti dalla Regione Piemonte.
            Alla responsabilità genitoriale sono sottoposti tutti i figli minori non emancipati, sia nati nel matrimonio
            sia nati fuori dal matrimonio. Ciò vale anche nel caso di figli adottivi, nel caso in cui i loro genitori
            adottivi – per effetto dell'adozione (legittimante) – acquistano a tutti gli effetti la responsabilità
            genitoriale.
          </div>
        </q-collapsible>

        <q-collapsible sparse label="21.	Quale dichiarazione di responsabilità genitoriale posso inserire?">
          <div>
            Accedendo alla sezione “Gestione minori” hai a disposizione la funzione “Nuova dichiarazione” con cui puoi
            inserire la dichiarazione di responsabilità genitoriale.
            Al momento il servizio telematico gestisce la “Dichiarazione congiunta di entrambi i genitori”, che permette
            a due genitori che congiuntamente si autenticano con SPID di inserire una dichiarazione di responsabilità
            genitoriale per lo stesso minore ed ottenere la delega del minore senza l’intervento dell'operatore
            dell’ASL. Il sistema richiede l’istanza di un genitore e la dichiarazione di conferma da parte dell’altro
            genitore (altre modalità, come per esempio la delega su dichiarazione fatta da un solo genitore, verranno
            abilitate in seguito).
          </div>
        </q-collapsible>

        <q-collapsible sparse label="22. La delega per un figlio minore può essere revocata?">
          <div>
            Sì, è sempre possibile revoca una delega inserita per un figlio minore con l’apposita funzione “Revoca”.
            L’operazione può essere effettuata da uno dei due genitori che hanno confermato la dichiarazione di
            responsabilità genitoriale per quel minore e ha effetto su entrambi: entrambi non potranno quindi più
            operare su quel minore.
          </div>
        </q-collapsible>

        <q-collapsible sparse
                       label="23.	Un cittadino non assistito in Piemonte può inserire una delega per figli minori?">
          <div>
            No. Il servizio “Gestione Deleghe” non permette a un cittadino non assistito da una ASL piemontese
            l’inserimento di una delega per figli minori. Nello scenario di “Dichiarazione congiunta di entrambi i
            genitori” sia i genitori sia il minore devono essere assistiti piemontesi.
          </div>
        </q-collapsible>

        <q-collapsible sparse label="24.	Le deleghe per i figli minori hanno una scadenza?">
          <div>
            Si, la delega scade automaticamente al compimento dei 18 anni del figlio, che, una volta diventato
            maggiorenne, potrà visualizzare lo storico delle proprie deleghe.
          </div>
        </q-collapsible>

        <q-collapsible sparse
                       label="25.	Quali dati devo conoscere per inserire una “Dichiarazione congiunta di entrambi i genitori”?">
          <div>
            Devi conoscere e inserire questi dati identificativi obbligatori:
            Altro genitore:
            <ul>
              <li>nome</li>
              <li>cognome</li>
              <li>codice fiscale</li>
              <li>data di nascita</li>
              <li>comune di nascita</li>
              <li>sesso.</li>
            </ul>
            Figli minori:
            <ul>
              <li>nome</li>
              <li>cognome</li>
              <li>codice fiscale</li>
              <li>data di nascita</li>
              <li>comune di nascita</li>
              <li>sesso.</li>
            </ul>
          </div>
        </q-collapsible>

        <q-collapsible sparse label="26.	Dove posso vedere le deleghe dei miei figli minori?">
          <div>
            Attraverso la funzionalità “I tuoi figli minori” puoi visualizzare l’elenco delle dichiarazioni di
            responsabilità genitoriale che hai inserito o confermato in qualità di genitore e i figli minori che vi sono
            collegati. Puoi anche filtrare le deleghe e verificarne lo stato:
            <ul>
              <li>inserita in attesa di conferma</li>
              <li>scaduta</li>
              <li>revocata</li>
            </ul>
          </div>
        </q-collapsible>
      </q-list>
    </q-card>

  </q-page>
</template>


<script>

  export default {
    name: 'PageFaq',
    props: {},
    data() {
      return {
        selectedTab: 'FAQ'
      }
    }
  }
</script>


<style lang="stylus">

  @require '~variables'

  .csi-page-delegations-faq
    .csi-text-underline
      text-decoration underline

    .q-collapsible-sub-item
      background-color $grey-1

</style>
