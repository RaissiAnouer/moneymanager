import { useEffect, useState } from "react";
import Dashboard from "../components/Dashboard";
import { useUser } from "../hooks/useUser";
import InfoCard from "../components/InfoCard";
import {
  Brain,
  Coins,
  FastForward,
  LoaderCircle,
  Wallet,
  WalletCards,
} from "lucide-react";
import { addThousandsSeparator } from "../util/addThousandsSeperator";
import { useNavigate } from "react-router-dom";
import axiosConfig from "../util/axiosConfig";
import { API_ENDPOINTS } from "../util/apiEndpoints";
import toast from "react-hot-toast";
import RecentTransactions from "../components/RecentTransactions";
import FinanceOverview from "../components/FinanceOverview";
import Transactions from "../components/Transactions";

const Home = () => {
  useUser();
  const navigate = useNavigate();
  const [DashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [aiInput, setAiInput] = useState("");
  const fetchDashboardData = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await axiosConfig.get(API_ENDPOINTS.DASHBOARD_DATA);
      if (response.status === 200) {
        setDashboardData(response.data);
      }
    } catch (error) {
      console.error(
        "Something went worng while fetching dashboard data",
        error,
      );
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleQuickAdd = async () => {
    setLoading(true);
    try {
      const response = await axiosConfig.post(API_ENDPOINTS.AI_INPUT, {
        input: aiInput,
      });
      if (response.status === 200) {
        toast.success("Transaction added successfully!");
        fetchDashboardData();
      }
    } catch (error) {
      console.log("Failed to add transaction", error);
      toast.error(error.response?.data?.message || "Failed to add transaction");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
    return () => {};
  }, []);

  return (
    <div>
      <Dashboard activeMenu="Dashboard">
        <div className="my-5 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/*Display the cards */}
            <InfoCard
              icon={<WalletCards />}
              label="Total Balance"
              value={addThousandsSeparator(DashboardData?.totalBalance || 0)}
              color="bg-purple-800"
            />
            <InfoCard
              icon={<Wallet />}
              label="Total Income"
              value={addThousandsSeparator(DashboardData?.totalIncome || 0)}
              color="bg-green-800"
            />
            <InfoCard
              icon={<Coins />}
              label="Total Expense"
              value={addThousandsSeparator(DashboardData?.totalExpense || 0)}
              color="bg-red-800"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div className="flex  items-center justify-between gap-2 card py-6 col-span-2 shadow-md shadow-purple-200">
              <Brain className="text-purple-800  rounded " size={50} />
              <input
                value={aiInput}
                onChange={(e) => setAiInput(e.target.value)}
                className="flex-1  bg-transparent outline-none border-2 border-gray-300 rounded-md py-3 px-5 pr-10 text-lg  text-gray-700 leading-tight focus:outline focus:outline-purple-800 "
                type="text"
                placeholder="Feeling lazy? Try: Added 50 TDN for freelance work..."
              />
              <button
                disabled={loading}
                onClick={handleQuickAdd}
                className="add-btn flex"
              >
                {loading ? (
                  <>
                    <LoaderCircle className="w-4 h-4 animate-spin" />
                    Adding...
                  </>
                ) : (
                  <>Quick Add</>
                )}
              </button>
            </div>
            {/*Recent Transactions */}
            <RecentTransactions
              transactions={DashboardData?.recentTransactions}
              onMore={() => navigate("/expense")}
            />

            {/*finance overview char */}
            <FinanceOverview
              totalBalance={DashboardData?.totalBalance || 0}
              totalIncome={DashboardData?.totalIncome || 0}
              totalExpense={DashboardData?.totalExpense || 0}
            />

            {/*expense Transactions */}
            <Transactions
              transactions={DashboardData?.recent5Expenses || []}
              onMore={() => navigate("/expense")}
              type="expense"
              title={"Recent Expenses"}
            />

            {/*income Transactions */}
            <Transactions
              transactions={DashboardData?.recent5Incomes || []}
              onMore={() => navigate("/income")}
              type="income"
              title={"Recent Incomes"}
            />
          </div>
        </div>
      </Dashboard>
    </div>
  );
};

export default Home;
