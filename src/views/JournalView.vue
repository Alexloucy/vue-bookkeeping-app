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
    <h1 v-if="journalList.length === 0">
      Start by clicking the plus icon on the top right corner
    </h1>

    <div id="notEmpty" v-else>
      <div class="journalList">
        <div class="journal" id="heading">
          <span id="item">Item</span>
          <span id="amount">Amount</span>
          <span id="date">Date</span>
          <div id="buttons">
            <button class="listButton" id="sort" type="button" @click="sort">
              <span class="material-symbols-outlined"> expand_more </span>Sort
              By
            </button>
          </div>
        </div>
        <div class="journal" v-for="(entry, i) in journalList" :key="i">
          <span id="item">{{ entry.item }}</span>
          <span id="amount">${{ entry.amount }}</span>
          <span id="date">{{ entry.date }}</span>
          <span id="buttons"
            ><button
              class="listButton"
              id="edit"
              type="button"
              @click="onEdit(i)"
            >
              Edit</button
            ><button
              class="listButton"
              id="delete"
              type="button"
              @click="onDelete(i)"
            >
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
import { onMounted } from 'vue';
import JournalForm from '@/components/JournalForm.vue';
import { collection, getDocs, getFirestore } from 'firebase/firestore';
import { db } from '../main.js';

export default {
  name: 'JournalView',
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
  async mounted() {
    console.log(db);
    const querySnapshot = await getDocs(collection(db, 'journals'));
    querySnapshot.forEach((doc) => {
      this.journalList.push({
        id: doc.id,
        item: doc.data().item,
        amount: doc.data().amount,
        date: doc.data().date,
      });
    });
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
  width: 65vw;
  height: 8vh;
  margin-left: auto;
  margin-right: auto;
  justify-content: space-around;
  align-items: center;
  background-color: rgb(72, 72, 74);
  border-radius: 5px;
  margin-bottom: 10px;
  padding: 1px;
  font-size: large;
  word-wrap: break-word;
}

#heading {
  background-color: inherit;
  height: 5vh;
}

#item {
  width: 15vw;
  margin: 5px 15px;
}

#amount {
  width: 7vw;
  margin: 5px 15px;
}

#date {
  width: 15vw;
  margin: 5px 15px;
}

.listButton {
  font-size: medium;
  padding: 6px;
  border-radius: 5px;
  color: white;
  margin: 0;
}

#delete {
  background-color: rgb(255, 69, 58);
}

#edit {
  background-color: blue;
}

#sort {
  width: 95px;
  display: flex;
}

#buttons {
  display: flex;
  width: 15vw;
  justify-content: space-evenly;
  margin-left: auto;
  margin-right: 0;
}

html {
  background-color: #121212;
  color: lightgrey;
}
</style>
