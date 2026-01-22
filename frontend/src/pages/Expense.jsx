import { useEffect, useState } from "react";
import Dashboard from "../components/Dashboard";
import { useUser } from "../hooks/useUser";
import { API_ENDPOINTS } from "../util/apiEndpoints";
import toast from "react-hot-toast";
import axiosConfig from "../util/axiosConfig";
import ExpenseOverview from "../components/ExpenseOverview";
import ExpenseList from "../components/ExpenseList";
import Modal from "../components/Modal";
import DeleteAlert from "../components/DeleteAlert";
import AddExpenseForm from "../components/AddExpenseForm";

const Expense = () => {
  const [expenseData, setExpenseData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });

  const fetchExpenseDetails = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await axiosConfig.get(API_ENDPOINTS.GET_ALL_EXPENSES);
      if (response.status === 200) {
        setExpenseData(response.data);
      }
    } catch (error) {
      console.error("Failed to fetch expense details", error);
      toast.error(
        error.response?.data?.message || "Failed to fetch income details",
      );
    } finally {
      setLoading(false);
    }
  };
  useUser();

  const fetchExpenseCategories = async () => {
    try {
      const response = await axiosConfig.get(
        API_ENDPOINTS.CATEGORY_BY_TYPE("expense"),
      );
      if (response.status === 200) {
        setCategories(response.data);
      }
    } catch (error) {
      console.error("Failed to fetch expense categories", error);
      toast.error(error?.data?.message || "Failed to fetch expense categories");
    }
  };

  const handleAddExpense = async (expense) => {
    const { name, amount, date, icon, categoryId } = expense;
    if (!name.trim()) {
      toast.error("Please enter a name");
      return;
    }
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      toast.error("Amount should be a valid number greater than 0");
      return;
    }
    if (!date) {
      toast.error("Please select a date");
      return;
    }
    const today = new Date().toISOString().split("T")[0];
    if (date > today) {
      toast.error("Date cannot be in the future");
      return;
    }
    if (!categoryId) {
      toast.error("Please select a category");
      return;
    }
    try {
      const response = await axiosConfig.post(API_ENDPOINTS.ADD_EXPENSE, {
        name,
        amount: Number(amount),
        date,
        icon,
        categoryId,
      });
      if (response.status === 201) {
        setOpenAddExpenseModal(false);
        toast.success("Expense added successfully!");
        fetchExpenseDetails();
        fetchExpenseCategories();
      }
    } catch (error) {
      console.log("Error adding expense", error);
      toast.error(error.response?.data?.message || "Failed adding expense");
    }
  };

  const handleDownloadExpenseDetails = async () => {
    try {
      const response = await axiosConfig.get(
        API_ENDPOINTS.EXPENSE_EXCEL_DOWNLOAD,
        { responseType: "blob" },
      );
      let filename = "expense_details.xlsx";
      const url = window.URL.createObjtURL(new Blob([response.data]));
      const link = document.createElementNS("a");
      link.href = url;
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
      toast.success("Download expenses details successfully!");
    } catch (error) {
      console.error("Error downloading expenses details", error);
      toast.error(
        error.response?.data?.message || "Failed to download expenses",
      );
    }
  };

  const handleEmailExpenseDetails = async () => {
    try {
      const response = await axiosConfig.get(API_ENDPOINTS.EMAIL_EXPENSE);
      if (response.status === 200) {
        toast.success("Expenses details emailed successfully!");
      }
    } catch (error) {
      console.error("Error emailing expenses details", error);
      toast.error(error.response?.data?.message || "Failed to email income");
    }
  };

  useEffect(() => {
    fetchExpenseDetails();
    fetchExpenseCategories();
  }, []);

  const deleteExpense = async (id) => {
    try {
      await axiosConfig.delete(API_ENDPOINTS.DELETE_EXPENSE(id));
      setOpenDeleteAlert({ show: false, data: null });
      toast.success("Expense Deleted successfully");
      fetchExpenseDetails();
    } catch (error) {
      console.error("Error deleting expense");
      toast.error(error.response?.data?.message || "Failed deleting expense");
    }
  };

  return (
    <Dashboard activeMenu="Expense">
      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 gap-6">
          <div>
            {/*overview for expenses with line chart */}
            <ExpenseOverview
              transactions={expenseData}
              onAddExpense={() => setOpenAddExpenseModal(true)}
            />
          </div>
          <ExpenseList
            transactions={expenseData}
            onDelete={(id) => setOpenDeleteAlert({ show: true, data: id })}
            onDownload={handleDownloadExpenseDetails}
            onEmail={handleEmailExpenseDetails}
          />
          {/*Add Expense Modal */}
          <Modal
            isOpen={openAddExpenseModal}
            onClose={() => setOpenAddExpenseModal(false)}
            title="Add expense"
          >
            <AddExpenseForm
              onAddExpense={(expense) => handleAddExpense(expense)}
              categories={categories}
            />
          </Modal>
          <Modal
            isOpen={openDeleteAlert.show}
            onClose={() => setOpenDeleteAlert({ show: false, data: null })}
            title="Delete Expense"
          >
            <DeleteAlert
              content="Are you sure you want to delete this expense details"
              onDelete={() => deleteExpense(openDeleteAlert.data)}
            />
          </Modal>
        </div>
      </div>
    </Dashboard>
  );
};
export default Expense;
