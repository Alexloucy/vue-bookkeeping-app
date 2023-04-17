<template lang="">
  <div class="background">
    <div class="outer">
      <form action="">
        <div class="title"><h1>Create a Journal</h1></div>

        <label for="item">item</label>
        <input type="text" v-model="entry.item" id="item" />

        <label for="amount">amount</label>
        <input type="text" v-model="entry.amount" id="amount" />

        <label for="date">date</label>
        <input type="text" v-model="entry.date" id="date" />

        <button @click.prevent="createJournal" id="create">Create</button>
      </form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      journalList: [],
      entry: {},
    };
  },
  methods: {
    createJournal() {
      this.$emit('clicked', this.entry);
    },
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
  width: 550px;
  height: 550px;
  border-radius: 2%;
  display: flex;

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
}

#create {
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

  margin-top: 30px;
}
</style>
