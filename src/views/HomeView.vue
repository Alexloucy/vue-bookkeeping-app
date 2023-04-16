<template>
  <div class="home">
    <h1 v-if="isEmpty">
      Start by clicking the plus icon on the top right corner
    </h1>
    <div id="plus_out" @click="createJournal()"><div id="plus">+</div></div>

    <JournalForm v-if="showJournalForm" @clicked="onSubmit" />
    <div id="formMask" v-if="showJournalForm"></div>

    <div class="journal">
      {{ this.journalList }}
    </div>
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
    };
  },
  methods: {
    createJournal() {
      this.showJournalForm = !this.showJournalForm;
    },
    onSubmit(entry) {
      this.showJournalForm = !this.showJournalForm;
      this.isEmpty = !this.isEmpty;
      console.log(entry);
      this.journalList.push(entry);
      console.log(this.journalList);
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
  z-index: 1;
}
#formMask {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.6);
}
</style>
