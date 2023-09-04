<template>
  <header class="wrapper">
    <div class="container">
      <p>Test Me</p>
    </div>
    <div class="container">
      <form>
        <div class="input-container">
          <label for="username">Username</label>
          <input type="text" id="username" />
        </div>
        <div class="input-container">
          <label for="password">Password</label>
          <input type="password" id="password" />
        </div>
        <button class="button">Submit</button>
      </form>
    </div>
  </header>
</template>

<script>

</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  background-color: #15769b;

  .container {
    padding: 0.5rem 2rem;

    p {
      font-weight: bold;
      font-size: 24px;
      color: white;
    }

    form {
      display: flex;
      flex-direction: row;
      gap: 10px;

      .input-container {
        label {
          margin: 0 10px;
        }

        input {
          border-radius: 5px;
          border: 1px solid #ccc;
        }
      }

      .button {
        border-radius: 5px;
        border: 1px solid #ccc;
        cursor: pointer;

        &:active,
        &:hover {
          background-color: rgb(195, 194, 194);
        }
      }
    }
  }
}
</style>
