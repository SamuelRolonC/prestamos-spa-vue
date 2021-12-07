<template>
  <div>
    <form @submit="formSubmit" method="post">
      <div class="row">
        <div class="col-md-3">
          <label for="loanDate">Fecha de prestamo</label>
          <div style="width: 100%"></div>
          <input
            v-model="loan.loanDate"
            type="date"
            name="loanDate"
            id="loanDate"
          />
        </div>
        <div class="col-md-3">
          <label for="description">Descripcion</label>
          <div style="width: 100%"></div>
          <input
            v-model="loan.description"
            type="text"
            name="description"
            id="description"
          />
        </div>
        <div class="col-md-3">
          <label for="person">Persona</label>
          <div style="width: 100%"></div>
          <select v-model="loan.personId" name="person" id="person">
            <option>Seleccione...</option>
            <option
              v-for="option in listPeople"
              :key="option.id"
              :value="option.id"
            >
              {{ option.text }}
            </option>
          </select>
        </div>
      </div>
      <div class="row">
        <div class="col-md-3">
          <label for="paymentMethod">Medio de pago</label>
          <div style="width: 100%"></div>
          <select
            v-model="loan.paymentMethodId"
            name="paymentMethod"
            id="paymentMethod"
          >
            <option>Seleccione...</option>
            <option
              v-for="option in listPaymentMethod"
              :key="option.id"
              :value="option.id"
            >
              {{ option.text }}
            </option>
          </select>
        </div>
        <div class="col-md-3">
          <label for="billingCycle">Periodo de tarjeta</label>
          <div style="width: 100%"></div>
          <select
            v-model="loan.billingCycleId"
            name="billingCycle"
            id="billingCycle"
          >
            <option>Seleccione...</option>
            <option
              v-for="option in listBillingCycle"
              :key="option.id"
              :value="option.id"
            >
              {{ option.text }}
            </option>
          </select>
        </div>
        <div class="col-md-3">
          <label for="amount">Importe</label>
          <div style="width: 100%"></div>
          <input
            v-model="loan.amount"
            type="number"
            name="amount"
            id="amount"
          />
        </div>
      </div>
      <div class="row">
        <div class="col-md-3">
          <label for="comments">Comentarios</label>
          <div style="width: 100%"></div>
          <input
            v-model="loan.comments"
            type="text"
            name="comments"
            id="comments"
          />
        </div>
      </div>
      <button type="submit">Grabar</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    let urlBase = "https://localhost:44347/",
      urlGet = urlBase + "loan",
      urlPost = urlBase + "loan/update";

    return {
      urlBase: urlBase,
      urlGet: urlGet,
      urlPost: urlPost,
      loan: {
        id: 0,
        description: "",
        loanDate: "",
        personId: "",
        paymentMethodId: "",
        billingCycleId: "",
        amount: "",
        comments: "",
      },
      listPeople: [],
      listBillingCycle: [],
      listPaymentMethod: [],
    };
  },
  methods: {
    getData() {
      let id = this.$route.params.id;
      let url = this.urlGet + "/" + id;

      return fetch(url)
        .then((res) => res.json())
        .then((res) => res);
    },
    setDataOnModel(data) {
      this.loan.id = data.loan.id;
      this.loan.description = data.loan.description;
      this.loan.loanDate = this.getStringDateFromServerStringDate(
        data.loan.loanedDate
      );
      this.loan.personId = data.loan.peopleId;
      this.loan.paymentMethodId = data.loan.paymentMethodId;
      this.loan.billingCycleId = data.loan.termId;
      this.loan.amount = data.loan.amount;
      this.loan.comments = data.loan.comments;

      this.listPeople = data.listPeople;
      this.listPaymentMethod = data.listPaymentMethod;
      this.listBillingCycle = data.listTerm;
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
    formSubmit(e) {
      e.preventDefault();

      const requestOptions = {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json",
          // Accept: "application/json",
        }),
        body: JSON.stringify({
          Loan: this.loan,
        }),
      };
      debugger;
      fetch(this.urlPost, requestOptions)
        .then(async (response) => {
          const data = await response.json();

          // check for error response
          if (!response.ok) {
            // get error message from body or default to response status
            const error = (data && data.message) || response.status;
            return Promise.reject(error);
          }

          this.postId = data.id;
        })
        .catch((error) => {
          console.log("ERROR: " + error);
        });
    },
  },
  created() {
    this.getData().then((data) => {
      this.setDataOnModel(data);
    });
  },
};
</script>
