<template lang="">
  <div class="background">
    <div class="outer">
      <form action="">
        <div class="title">
          <h1 v-if="!isEdit">Create a Journal</h1>
          <h1 v-if="isEdit">Edit a Journal</h1>
        </div>

        <label for="item">item</label>
        <input type="text" v-model="entry.item" id="item" required />

        <label for="amount">amount</label>
        <input
          type="number"
          v-model="entry.amount"
          id="amount"
          placeholder="please enter a number"
          required
        />

        <label for="date">date</label>
        <input type="date" v-model="entry.date" id="date" required />
        <div id="buttonRow">
          <button @click.prevent="cancelJournal" id="cancel" class="formButton">
            Cancel
          </button>
          <button @click.prevent="createJournal" id="create" class="formButton">
            Create
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
      entry: {},
    };
  },
  methods: {
    createJournal() {
      this.$emit('clicked', this.entry);
    },
    cancelJournal() {
      this.entry = {};
      this.$emit('cancel');
    },
  },
  created() {
    if (this.isEdit) {
      this.entry = this.currentEntry;
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
  width: 400px;
  height: 400px;
  border-radius: 2%;
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  align-items: center;

  background-color: white;
  z-index: 1;
}
form {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  align-content: center;
  flex-wrap: wrap;
}
h1 {
  margin-left: center;
  margin-bottom: 30px;
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
  margin-top: 30px;
  margin-right: 30px;
}

#cancel {
  background-color: red;
}

input {
  width: 100%;
  height: 20px;
  padding: 2px;
  margin-bottom: 3px;
}
label {
  margin-bottom: 3px;
}
</style>
