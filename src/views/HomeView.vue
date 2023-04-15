<template>
  <div class="home">
    <h1 v-if="isEmpty">
      Start by clicking the plus icon on the top right corner
    </h1>
    <div id="plus_out" @click="createJournal()"><div id="plus">+</div></div>
    <JournalForm v-if="showJournalForm" />
  </div>
</template>

<script>
// @ is an alias to /src
import JournalForm from '@/components/JournalForm.vue';

export default {
  name: 'HomeView',
  components: { JournalForm },
  data() {
    return {
      isEmpty: true,
      showJournalForm: false,
      journalList: [],
      journal: {},
    };
  },
  methods: {
    createJournal() {
      this.showJournalForm = !this.showJournalForm;
    },
  },
};
</script>

<style>
#plus_out {
  border-style: solid;
  border-color: blue;
  border-radius: 0.5ch;
  position: absolute;
  top: 55px;
  right: 16px;
  width: 25px;
  height: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
#plus {
  color: blue;
  vertical-align: middle;
  font-size: large;
  font-weight: bold;
}
</style>
