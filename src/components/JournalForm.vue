<template lang="">
  <div class="background">
    <div class="outer">
      <div class="form">
        <form action="">
          <div class="title"><h1>Create a Journal</h1></div>
          <div class="content">
            <label for="item">item</label><br />
            <input type="text" v-model="entry.item" id="item" />
          </div>
          <div class="content">
            <label for="amount">amount</label><br />
            <input type="text" v-model="entry.amount" id="amount" />
          </div>
          <div class="content">
            <label for="date">date</label><br />
            <input type="text" v-model="entry.date" id="date" />
          </div>
          <button @click.prevent="createJournal" id="create">Create</button>
        </form>
      </div>
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
.form {
  display: flex;
}
h1 {
}
.content {
  display: flex;
  align-items: center;
  justify-content: center;
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
  box-sizing: content-box;
  align-items: center;
}
</style>
