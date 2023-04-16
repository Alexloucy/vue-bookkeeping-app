<template lang="">
  <div class="background">
    <div class="outer">
      <h1>Create a Journal</h1>
      <div class="form">
        <form action="">
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
          <button @click.prevent="createJournal">Create</button>
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
  border-style: solid;
  border-radius: 2%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 20px 20px 40px 1px #656565;
  background-color: white;
  z-index: 1;
}
.form {
  display: flex;
}
.content {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
