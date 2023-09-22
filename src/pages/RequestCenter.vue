<template>
  <section>
    <div class="container">
      <h2>Requesting days off</h2>
      <form class="form" @submit.prevent="handleSubmit">
        <div class="form-control">
          <label for="absence">Type of absence</label>
          <select id="absence" v-model="requestDaysOff.requestTypes">
            <option v-for="(type, i) of requestTypes" :key="i">{{ type }}</option>
          </select>
        </div>
        <div class="form-control">
          <div class="date-control">
            <label for="dateFrom">From date</label>
            <label for="dateTo">Date Until</label>
          </div>
          <div class="date-control">
            <input type="date" id="dateFrom" v-model="requestDaysOff.startDate">
            <input type="date" id="dateTo" v-model="requestDaysOff.endDate">
          </div>
        </div>
        <button type="submit" class="btn approve">Request absence</button>
      </form>
    </div>
  </section>

  <section>
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
          <tbody v-if="requestDaysOffGet">
            <tr v-for="(request, i) in requestDaysOffGet.flat()" :key="i">
              <td>Name</td>
              <td>{{ request.startDate }}</td>
              <td>{{ request.endDate }}</td>
              <td>{{ request.requestTypes }}</td>
              <td class="pending">
                <p class="status-paragraph"
                  :class="{ 'approve': request.status === 'approved', 'reject': request.status === 'rejected' }">{{
                    request.status }}</p>
              </td>
              <td v-if="request.status === 'pending'"><button class="btn approve"
                  @click="approveDaysOff(i)">Approve</button></td>
              <td v-if="request.status === 'pending'"><button class="btn reject" @click="rejectDaysOff(i)">Reject</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { reactive, ref, onMounted } from 'vue';


type RequestDaysType = {
  requestTypes: string,
  startDate?: Date | null,
  endDate?: Date | null,
  status: string
}

export default {
  setup() {
    const requestDaysOff = reactive<RequestDaysType>({
      requestTypes: '',
      startDate: null,
      endDate: null,
      status: ''
    })

    const statusDaysOff = ref<boolean>();
    const requestDaysOffGet = ref<any>([]);

    const requestTypes = ref<string[]>(["Vacation", "Day off", "Sick leave"])

    const handleSubmit = async () => {
      requestDaysOff.status = 'pending';

      const res = await fetch('http://localhost:3000/requestDays', {
        method: 'POST',
        body: JSON.stringify({
          requestTypes: requestDaysOff.requestTypes,
          startDate: requestDaysOff.startDate,
          endDate: requestDaysOff.endDate,
          status: requestDaysOff.status
        }),
        headers: { 'Content-Type': 'application/json' },
      })
      console.log(res);

      requestDaysOff.startDate = null;
      requestDaysOff.endDate = null;
      requestDaysOff.requestTypes = '';
      await getRequestsDaysOff();
    }

    const getRequestsDaysOff = async () => {
      try {
        const res = await fetch('http://localhost:3000/requestDays');

        const responseData: any = await res.json();

        requestDaysOffGet.value = responseData;
      } catch (error) {
        console.log(error);
      }
    }

    const updateStatus = async (index: number) => {
      try {
        const res = await fetch('http://localhost:3000/requestDays/' + index, {
          method: 'PATCH',
          body: JSON.stringify({
            status: (statusDaysOff.value ? 'approved' : 'rejected')
          }),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        })

        console.log(res);
      } catch (error) {
        console.log(error);
      }

      await getRequestsDaysOff();
    }

    const approveDaysOff = (index: number) => {
      statusDaysOff.value = true;
      updateStatus(index + 1);
    }
    const rejectDaysOff = (index: number) => {
      statusDaysOff.value = false;
      updateStatus(index + 1);
    }

    onMounted(async () => {
      await getRequestsDaysOff()
    })

    return {
      requestDaysOff,
      requestTypes,
      handleSubmit,
      onMounted,
      requestDaysOffGet,
      approveDaysOff,
      rejectDaysOff
    }
  }
}
</script>

<style scoped lang="scss">
.container {
  margin: 30px 70px;
  padding: 10px 10px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;

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
          .status-paragraph {
            border-radius: 10px;
            background-color: #ffb07426;
            color: #1A1A1A;
            display: inline-block;
            padding: 10px 32px;

            &.approve {
              background-color: #5B826659;
            }

            &.reject {
              background-color: #EF233CCC;
            }
          }
        }

      }
    }
  }

  .form {
    text-align: center;

    &-control {
      margin-bottom: 20px;

      label {
        display: block;
        margin-bottom: 10px;
      }

      select {
        width: 20%;
      }

      .date-control {
        label {
          display: inline-block;
          margin: 10px;
        }

        input {
          margin: 10px;
        }
      }
    }
  }
}
</style>
