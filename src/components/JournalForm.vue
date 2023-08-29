<template lang="">
  <div class="background">
    <div class="outer">
      <form action="">
        <div class="title">
          <h1 v-if="!isEdit">Create a Journal</h1>
          <h1 v-if="isEdit">Edit a Journal</h1>
        </div>

        <label for="item">item</label>
        <input
          type="text"
          v-model="item"
          class="formInput"
          id="itemInput"
          required
        />

        <label for="amount">amount</label>
        <input
          type="number"
          v-model="amount"
          class="formInput"
          id="amountInput"
          placeholder="please enter a number"
          required
        />

        <label for="date">date</label>
        <input
          type="date"
          v-model="date"
          class="formInput"
          id="dateInput"
          required
        />
        <div id="buttonRow">
          <button @click.prevent="cancelJournal" id="cancel" class="formButton">
            Cancel
          </button>
          <button
            v-if="!isEdit"
            @click.prevent="createJournal"
            class="formButton"
          >
            Create
          </button>
          <button
            v-if="isEdit"
            @click.prevent="updateJournal"
            class="formButton"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
export default {
  props: ['currentEntry', 'isEdit'],

  data() {
    return {
      item: null,
      amount: null,
      date: new Date().getDate().toLocaleString('af-ZA'),
      id: null,
    };
  },
  methods: {
    createJournal() {
      this.$emit('clicked', this.item, this.amount, this.date);
    },
    cancelJournal() {
      this.entry = {};
      this.$emit('cancel');
    },
    updateJournal() {
      this.$emit('updated', this.id, this.item, this.amount, this.date);
    },
  },
  created() {
    if (this.isEdit) {
      this.id = this.currentEntry.id;
      this.item = this.currentEntry.item;
      this.amount = this.currentEntry.amount;
      this.date = this.currentEntry.date.toLocaleDateString('af-ZA');
    }
  },
};
</script>
<style>
.background {
  display: flex;
  justify-content: center;
  align-items: center;
}
.outer {
  border-radius: 2%;
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  align-items: center;
  background-color: rgb(72, 72, 74);
  color: white;
  z-index: 1;
}
form {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  align-content: center;
  flex-wrap: wrap;
  margin-left: 10px;
  margin-right: 10px;
  padding: 15px;
}

.formInput {
  margin-bottom: 20px;
  height: 35px;
  width: 350px;
  border: 0px;
  border-radius: 4px;
  font-size: 16px;
  padding-left: 5px;
}

.formInput:focus {
  outline-style: solid;
  outline-color: #7f55e0;
  outline-width: 3px;
  box-shadow: none;
  -moz-box-shadow: none;
  -webkit-box-shadow: none;
}

h1 {
  margin-left: center;
  margin-bottom: 20px;
}

button {
  background-color: blue;
  border-style: none;
  border-radius: 10px;
  width: 80px;
  height: 40px;
  text-align: center;
  vertical-align: middle;
  color: white;
  font-size: medium;
  padding: 0%;
  align-items: center;
  margin-top: 20px;
  margin-right: 30px;
}

button:hover {
  cursor: pointer;
}

#cancel {
  background-color: rgb(255, 69, 58);
}

input {
  width: 100%;
  height: 20px;
  padding: 2px;
  margin-bottom: 3px;
}
label {
  margin-bottom: 5px;
}
</style>
