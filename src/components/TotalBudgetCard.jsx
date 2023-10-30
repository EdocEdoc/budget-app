import React from "react";
import BudgetCard from "./BudgetCard";
import {
  UNCATEGORIZED_BUDGET_ID,
  useBudgets,
} from "../contexts/BudgetsContext";

export default function TotalBudgetCard(props) {
  const { getBudgetExpenses, expenses, budgets } = useBudgets();
  const amount = expenses.reduce((total, expense) => total + expense.amount, 0);
  const max = budgets.reduce((total, budget) => total + budget.max, 0);
  if (max == 0) return null;
  return (
    <BudgetCard hideButtons amount={amount} name={"Total"} gray max={max} />
  );
}
