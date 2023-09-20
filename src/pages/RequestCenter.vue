<template>
  <div class="container">
    <h2>Requests</h2>
    <div>
      <table class="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Start date</th>
            <th>End date</th>
            <th>Type</th>
            <th>Status</th>
            <th>Approve</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>Name</th>
            <th>22.2.2022</th>
            <th>23.2.2022</th>
            <th>Vacation</th>
            <th class="pending">
              <p>Pending</p>
            </th>
            <th><button class="btn approve">Approve</button></th>
            <th><button class="btn reject">Reject</button></th>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
</script>

<style scoped lang="scss">
.container {
  margin: 30px 70px;
  padding: 10px 10px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;

  .table {
    width: 100%;
    border-collapse: collapse;
    text-align: left;

    th {
      padding-top: 12px;
      padding-bottom: 12px;

      &:nth-last-child(-n+2) {
        text-align: center;
      }
    }

    tbody {
      font-size: 14px;

      tr {
        color: #71747d;
        border-bottom: 1px solid #000;

        .pending {
          p {
            border-radius: 10px;
            background-color: #ffb07426;
            display: inline-block;
            padding: 10px 32px;
          }
        }

        .btn {
          display: flex;
          justify-content: center;
          padding: 10px 32px;
          display: inline-block;
          border: none;
          border-radius: 30px;

          &.approve {
            background-color: #F6F3F3;
            color: #C6932E;
          }

          &.reject {
            background-color: #EF233C;
            color: #1A1A1A;
          }
        }
      }
    }
  }
}
</style>
