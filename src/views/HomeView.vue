<template>
  <div class="home">
    <h1 v-if="isEmpty">
      Start by clicking the plus icon on the top right corner
    </h1>
    <div id="plus_out" @click="createJournal()"><div id="plus">+</div></div>

    <JournalForm
      v-if="showCreateForm"
      @clicked="onSubmit"
      @cancel="onCreateCancel"
      class="JournalForm"
      :isEdit="isEdit"
    />
    <JournalForm
      v-if="showEditForm"
      @updated="onUpdate"
      @cancel="onEditCancel"
      class="JournalForm"
      :currentEntry="currentEntry"
      :isEdit="true"
    />
    <div id="formMask" v-if="showCreateForm"></div>
    <div id="formMask" v-if="showEditForm"></div>

    <div class="journalList">
      <div class="journal" v-for="(entry, i) in journalList" :key="i">
        <span id="item">{{ entry.item }}</span>
        <span id="amount">${{ entry.amount }}</span>
        <span id="date">{{ entry.date }}</span>
        <span id="buttons"
          ><button id="edit" type="button" @click="onEdit(i)">Edit</button
          ><button id="delete" type="button" @click="onDelete(i)">
            Delete
          </button></span
        >
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import JournalForm from '@/components/JournalForm.vue';
import { ref } from 'vue';

export default {
  name: 'HomeView',
  components: { JournalForm },
  data() {
    return {
      isEmpty: true,
      showCreateForm: false,
      journalList: [],
      showEditForm: false,
      isEdit: false,
      currentEntry: {},
      currentKey: Number,
    };
  },
  methods: {
    createJournal() {
      this.showCreateForm = !this.showCreateForm;
    },
    onSubmit(entry) {
      if (entry.item && entry.amount && entry.date) {
        this.showCreateForm = !this.showCreateForm;
        if (this.isEmpty) this.isEmpty = !this.isEmpty;
        this.journalList.push(entry);
      } else {
        alert('Please fill in all the blanks');
      }
    },
    onUpdate(entry) {
      if (entry.item && entry.amount && entry.date) {
        this.showEditForm = !this.showEditForm;
      } else {
        alert('Please fill in all the blanks');
      }
    },
    onCreateCancel() {
      console.log('receive cancel');
      this.showCreateForm = !this.showCreateForm;
    },
    onEditCancel() {
      this.showEditForm = !this.showEditForm;
      this.isEdit = !this.isEdit;
    },
    onDelete(i) {
      this.journalList.pop(i);
    },
    onEdit(i) {
      this.isEdit = !this.isEdit;
      this.showEditForm = !this.showEditForm;
      this.currentEntry = this.journalList[i];
      this.currentKey = i;
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
  z-index: 1;
}
#plus {
  color: blue;
  vertical-align: middle;
  font-size: large;
  font-weight: bold;
}
#formMask {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.6);
}
.JournalForm {
  position: absolute;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  z-index: 1;
}

.journal {
  display: flex;
  width: 60vw;
  height: 8vh;
  margin-left: auto;
  margin-right: auto;
  justify-content: space-around;
  align-items: center;
  background-color: rgb(238, 229, 229);
  border-radius: 5px;
  margin-bottom: 10px;
  padding: 1px;
  font-size: large;
}
#delete {
  font-size: medium;
  background-color: red;
  padding: 6px;
  border-radius: 5px;
  color: white;
  margin: 0;
}
#edit {
  font-size: medium;
  background-color: blue;
  padding: 6px;
  border-radius: 5px;
  color: white;
  margin: 0;
}

#buttons {
  display: flex;
  width: 15vw;
  justify-content: space-evenly;
}
</style>
