import { useState } from "react";
import { Button, Container, Stack } from "react-bootstrap";
import BudgetCard from "./components/BudgetCard";
import AddBudgetModal from "./components/AddBudgetModal";
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from "./contexts/BudgetsContext";
import AddExpenseModal from "./components/AddExpenseModal";
import UncategorizedBudgetCard from "./components/UncategorizedBudgetCard";
import TotalBudgetCard from "./components/TotalBudgetCard";
import ViewExpensesModal from "./components/ViewExpensesModal";

function App() {
  const [showBudgetModal, setShowBudgetModal] = useState(false);
  const [showExpenseModal, setShowExpenseModal] = useState(false);
  const [addExpenseModalBudgetId, setAddExpenseModalBudgetId] = useState();
  const { budgets, expenses, getBudgetExpenses } = useBudgets();
  const [viewExpensesModalBudgetID, setViewExpensesModalBudgetID] = useState();

  const openAddExpenseModal = (budgetId) => {
    setShowExpenseModal(true);
    setAddExpenseModalBudgetId(budgetId);
  };

  return (
    <>
      <Container className="my-4">
        <Stack direction="horizontal" gap="2" className="mb-4">
          <h1 className="me-auto">Budgets</h1>
          <Button variant="primary" onClick={() => setShowBudgetModal(true)}>
            Add Budgets
          </Button>
          <Button
            variant="outline-primary"
            onClick={() => openAddExpenseModal(null)}
          >
            Add Expenses
          </Button>
        </Stack>
        {/* this is a css grid not bootstrap */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "1rem",
            alignItems: "flex-start",
          }}
        >
          {budgets.map((budget) => {
            const amount = getBudgetExpenses(budget.id).reduce(
              (total, expense) => total + expense.amount,
              0
            );
            return (
              <BudgetCard
                key={budget.id}
                name={budget.name}
                amount={amount}
                max={budget.max}
                onViewExpenseClick={() =>
                  setViewExpensesModalBudgetID(budget.id)
                }
                onAddExpenseClick={() => openAddExpenseModal(budget.id)}
              />
            );
          })}
          <UncategorizedBudgetCard
            onAddExpenseClick={openAddExpenseModal}
            onViewExpenseClick={() =>
              setViewExpensesModalBudgetID(UNCATEGORIZED_BUDGET_ID)
            }
          />
          <TotalBudgetCard />
        </div>
      </Container>
      <AddBudgetModal
        show={showBudgetModal}
        handleClose={() => setShowBudgetModal(false)}
      />
      <AddExpenseModal
        show={showExpenseModal}
        defaultBudgetId={addExpenseModalBudgetId}
        handleClose={() => setShowExpenseModal(false)}
      />
      <ViewExpensesModal
        budgetId={viewExpensesModalBudgetID}
        handleClose={() => setViewExpensesModalBudgetID(null)}
      />
    </>
  );
}

export default App;
