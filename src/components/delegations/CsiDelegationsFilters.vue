
<!--
SPDX-License-Identifier: EUPL-1.2
(C) Copyright 2019-2020 Regione Piemonte
-->
<style></style>


<template>
  <div>

    <q-collapsible icon="filter_list" label="Filtra per">
      <div class="row">

        <!-- Filtro per servizio -->
        <div class="col-12 col-md q-pa-sm">
          <q-field>
            <q-select
              :options="servicesOptions"
              :value="service"
              @change="$emit('service-change', $event)"
              float-label="Servizio"
              filter
              autofocus-filter
              filter-placeholder="Cerca tra i servizi ..."
              clearable>
            </q-select>
          </q-field>
        </div>

        <!-- Filtro per stato -->
        <div class="col-12 col-md q-pa-sm">
          <q-field>
            <q-select
              :options="statussOptions"
              :value="status"
              @change="$emit('status-change', $event)"
              float-label="Stato"
              filter
              autofocus-filter
              filter-placeholder="Cerca per stato ..."
              clearable>
            </q-select>
          </q-field>
        </div>

      </div>
    </q-collapsible>

  </div>
</template>

<script>
  import {orderBy} from '@services/global/utils'
  import {getDelegationStatusLabel, getDelegationStatuss} from '@services/delegations/business-logic'

  export default {
    name: 'CsiDelegationsFilters',
    props: {
      service: {required: false, default: null},
      status: {required: false, default: null},
    },
    data() {
      return {}
    },
    computed: {
      appServices() {
        let services = this.$store.getters['global/delegableAppServices']
        return orderBy(services, ['descrizione'], ['asc'])
      },
      servicesOptions() {
        return this.appServices.map(service => {
          return {label: service.descrizione, value: service.codice_servizio, _model: service}
        })
      },
      statussOptions() {
        let statuss = getDelegationStatuss()
        return Object.values(statuss).map(s => ({value: s, label: getDelegationStatusLabel(s)}))
      }
    }
  }
</script>
