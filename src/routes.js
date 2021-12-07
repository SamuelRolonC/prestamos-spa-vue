import Loans from "@/components/Loans.vue";
import Loan from "@/components/Loan.vue";

const routes = [
  { path: "/", component: Loans, name: "loans" },
  { path: "/loan/:id", component: Loan, name: "loan" },
];

export default routes;
