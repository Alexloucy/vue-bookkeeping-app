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
      @deleted="onMobileDelete"
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
          <div id="customSelect">
            <select
              name="sortBy"
              id="sort"
              @change="sortBy(sortType)"
              v-model="sortType"
            >
              <option v-for="item in sortOptions" :value="item.value">
                {{ item.text }}
              </option>
            </select>
          </div>
        </div>
        <div class="journal" v-for="(entry, i) in journalList" :key="i">
          <span id="item">{{ entry.item }}</span>
          <span id="amount">${{ entry.amount }}</span>
          <span id="date">{{ entry.date.toLocaleDateString('en-NZ') }}</span>
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
import {
  collection,
  getDocs,
  onSnapshot,
  addDoc,
  Timestamp,
  setDoc,
  doc,
  deleteDoc,
  where,
  query,
  orderBy,
} from 'firebase/firestore';
import { db, auth } from '../firebase/firebaseInit.js';

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
      id: null,
      item: null,
      amount: null,
      date: null,
      sortType: 'sort',
      sortOptions: [
        { text: 'sort by', value: 'sort' },
        { text: 'Date Descending', value: 'dateDes' },
        { text: 'Date Ascending', value: 'dateAsc' },
        { text: 'Amount Descending', value: 'amountDes' },
        { text: 'Amount Ascending', value: 'amountAsc' },
      ],
    };
  },
  methods: {
    createJournal() {
      this.showCreateForm = !this.showCreateForm;
    },
    async onSubmit(item, amount, date) {
      if (item && amount && date) {
        // this.showCreateForm = !this.showCreateForm;
        // if (this.isEmpty) this.isEmpty = !this.isEmpty;
        // this.journalList.push(entry);
        // let dateObj = new Date(date)
        this.showCreateForm = !this.showCreateForm;
        await addDoc(collection(db, 'journals'), {
          item: item,
          amount: amount,
          date: Timestamp.fromDate(new Date(date)),
          userId: auth.currentUser.uid,
        });
      } else {
        alert('Please fill in all the blanks');
      }
    },
    async onUpdate(id, item, amount, date) {
      if (item && amount && date) {
        this.showEditForm = !this.showEditForm;
        this.isEdit = !this.isEdit;
        await setDoc(doc(db, 'journals', id), {
          item: item,
          amount: amount,
          date: Timestamp.fromDate(new Date(date)),
          userId: auth.currentUser.uid,
        });
      } else {
        alert('Please fill in all the blanks');
      }
    },
    onCreateCancel() {
      this.showCreateForm = !this.showCreateForm;
    },
    onEditCancel() {
      this.showEditForm = !this.showEditForm;
      this.isEdit = !this.isEdit;
    },
    async onDelete(i) {
      let toDelete = this.journalList[i];
      await deleteDoc(doc(db, 'journals', toDelete.id));
    },
    async onMobileDelete(id) {
      console.log('delete');
      this.showEditForm = !this.showEditForm;
      await deleteDoc(doc(db, 'journals', id));
    },
    onEdit(i) {
      this.isEdit = !this.isEdit;
      this.showEditForm = !this.showEditForm;
      this.currentEntry = this.journalList[i];
      this.currentKey = i;
    },
    sortBy(sortType) {
      if (sortType === 'dateAsc') {
        this.journalList.sort((a, b) => new Date(a.date) - new Date(b.date));
      } else if (sortType === 'dateDes') {
        this.journalList.sort((a, b) => new Date(b.date) - new Date(a.date));
      } else if (sortType === 'amountDes') {
        this.journalList.sort((a, b) => b.amount - a.amount);
      } else if (sortType === 'amountAsc') {
        this.journalList.sort((a, b) => a.amount - b.amount);
      }
    },
  },
  mounted() {
    onSnapshot(
      query(
        collection(db, 'journals'),
        where('userId', '==', auth.currentUser.uid),
        orderBy('date', 'desc')
      ),
      (snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === 'added') {
            this.journalList.push({
              id: change.doc.id,
              item: change.doc.data().item,
              amount: change.doc.data().amount,
              date: change.doc.data().date.toDate(),
            });
          }
          if (change.type === 'modified') {
            const checkId = (journal) => journal.id == change.doc.id;
            let index = this.journalList.findIndex(checkId);
            this.journalList[index] = {
              id: change.doc.id,
              item: change.doc.data().item,
              amount: change.doc.data().amount,
              date: change.doc.data().date.toDate(),
            };
          }
          if (change.type === 'removed') {
            const checkId = change.doc.id;
            this.journalList = this.journalList.filter((e) => e.id !== checkId);
          }
        });
      }
    );
  },
};
</script>

<style>
#plus {
  color: rgb(67, 67, 220);
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
  width: 70vw;
  height: 7vh;
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
  width: 20vw;
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

select {
  background-color: rgb(72, 72, 74);
  border-color: #8a8484;
  color: #fff;
  width: 170px !important;
  height: 30px;
  font-size: 16px;
  margin-left: 140px;
  outline: none;
  border-radius: 5px;
}

select:hover {
  border-color: #777;
}

select:focus {
  border-color: #999;
}

html {
  background-color: #181717;
  color: lightgrey;
}

@media screen and (max-width: 800px) {
  .journal {
    display: flex;
    width: 95vw;
    height: 7vh;
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
    font-size: 14px;
  }
  #item {
    width: 15vw;
    margin: 5px 15px;
  }

  #amount {
    width: 14vw;
    margin: 5px 15px;
  }

  #date {
    width: 20vw;
    margin: 5px 15px;
  }
  select {
    background-color: rgb(72, 72, 74);
    border-color: #8a8484;
    color: #fff;
    width: 130px !important;
    height: 30px;
    font-size: 14px;
    margin-left: 0;
    outline: none;
    border-radius: 5px;
  }

  select:hover {
    border-color: #777;
  }

  select:focus {
    border-color: #999;
  }
  #delete {
    display: none;
  }
  #edit {
    margin-right: 5px;
  }
}
</style>
