<template>
  <div>
    <h1>Loans</h1>
    <table style="padding: 10%">
      <thead>
        <tr>
          <th>
            <span>Descripcion</span>
          </th>
          <th>Fecha</th>
          <th>Persona</th>
          <th>Importe</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="loan in listLoan" :key="loan.description">
          <td>
            <span>{{ loan.description }}</span>
          </td>
          <td>
            <span>{{ loan.loanDate }}</span>
          </td>
          <td>
            <span>{{ loan.person }}</span>
          </td>
          <td>
            <span>{{ loan.amount }}</span>
          </td>
          <td>
            <button @click="onEdit(loan.id)">Editar</button>
            <button @click="onDelete(loan.id)">Borrar</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "Loans",
  components: {},
  data() {
    return {
      urlBase: "https://localhost:44347/loan",
      listLoan: [],
    };
  },
  methods: {
    getData() {
      let url = this.urlBase;

      return fetch(url)
        .then((res) => res.json())
        .then((res) => res);
    },
    setDataOnModel(data) {
      data.forEach((currData) => {
        let loan = currData.loan;
        let loanModel = {};

        loanModel.id = loan.id;
        loanModel.description = loan.description;
        loanModel.loanDate = this.getStringDateFromServerStringDate(
          loan.loanedDate
        );
        loanModel.person = loan.peopleId;
        loanModel.amount = loan.amount;

        this.listLoan.push(loanModel);
      });
    },
    getStringDateFromServerStringDate(stringDate) {
      let date = new Date(stringDate);
      let mm = date.getMonth() + 1; // getMonth() is zero-based
      let dd = date.getDate();

      return [
        date.getFullYear(),
        "-",
        (mm > 9 ? "" : "0") + mm,
        "-",
        (dd > 9 ? "" : "0") + dd,
      ].join("");
    },
    onEdit(id) {
      console.log(id);
      this.$router.push({ name: "loan", params: { id } });
    },
    onDelete(id) {
      console.log(id);
      this.$router.push({ name: "loan", params: { id } });
    },
    onCreate() {
      this.$router.push({ name: "loan" });
    },
  },
  created() {
    // this.loans = [
    //   {
    //     id: 1,
    //     description: "Spotify",
    //     loanDate: "17/09/2021",
    //     person: "Mamá",
    //     amount: 179.5,
    //   },
    //   {
    //     id: 2,
    //     description: "Inmobilizador Rafael",
    //     loanDate: "1/11/2021",
    //     person: "Mamá",
    //     amount: 5000,
    //   },
    // ];

    this.getData().then((data) => {
      this.setDataOnModel(data);
    });
  },
};
</script>

<style scoped>
.up::before {
  content: "👆";
}

.down::before {
  content: "👇";
}

table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 90%;
  margin: 0 5%;
}

td,
th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}

tr:nth-child(even) {
  background-color: #dddddd;
}

@media (min-width: 640px) {
  td,
  th {
    padding: 20px;
    font-size: 1rem;
  }

  th {
    padding: 12px;
  }
}
</style>
