<template>
  <div class="home">
    <span class="material-symbols-outlined" id="plus" @click="createJournal">
      add_box
    </span>
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
    <h1 v-if="isEmpty">
      Start by clicking the plus icon on the top right corner
    </h1>

    <div id="notEmpty" v-else>
      <div class="journalList">
        <div class="journal" id="header">
          <span>Item</span>
          <span>Amount</span>
          <span>Date</span>
        </div>
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
        this.isEdit = !this.isEdit;
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
#plus {
  color: rgb(59, 59, 198);
  position: absolute;
  top: 35px;
  right: 10px;
  cursor: pointer;
  z-index: 1;
  font-variation-settings: 'FILL' 0, 'wght' 400;
  font-size: 40px;
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
  background-color: #303030;
  border-radius: 5px;
  margin-bottom: 10px;
  padding: 1px;
  font-size: large;
}
#delete {
  font-size: medium;
  background-color: #b00020;
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

button {
  margin-right: 15px;
}

html {
  background-color: #121212;
  color: lightgrey;
}
</style>
