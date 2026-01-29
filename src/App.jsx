import React, { useState, useMemo } from "react";
import {
  RefreshCcw,
  DollarSign,
  Users,
  Percent,
  Briefcase,
  Printer,
  Calendar,
  Filter,
  X,
  UserCircle,
} from "lucide-react";

const INITIAL_CONSULTANTS = [
  {
    id: 1,
    type: "consultant",
    category: "Interviews & Observations",
    activity: "Interview of all support staff",
    owner: "Alice",
    days: 3,
    rate: 25000,
  },
  {
    id: 2,
    type: "consultant",
    category: "Interviews & Observations",
    activity: "Interview of selected drivers, conductors",
    owner: "Alice",
    days: 0,
    rate: 25000,
  },
  {
    id: 3,
    type: "consultant",
    category: "Interviews & Observations",
    activity: "Development of findings report",
    owner: "Alice",
    days: 0,
    rate: 25000,
  },
  {
    id: 4,
    type: "consultant",
    category: "Governance & HR Review",
    activity: "Review HR policies and procedures",
    owner: "Carol",
    days: 1,
    rate: 25000,
  },
  {
    id: 5,
    type: "consultant",
    category: "Governance & HR Review",
    activity: "Review Governance structures",
    owner: "Carol",
    days: 1,
    rate: 25000,
  },
  {
    id: 6,
    type: "consultant",
    category: "Governance & HR Review",
    activity: "Review Training Programs",
    owner: "Carol",
    days: 0.5,
    rate: 25000,
  },
  {
    id: 7,
    type: "consultant",
    category: "Governance & HR Review",
    activity: "Review of Disciplinary Procedures",
    owner: "Carol",
    days: 0.5,
    rate: 25000,
  },
  {
    id: 8,
    type: "consultant",
    category: "Governance & HR Review",
    activity: "Review of Legal/Compliance",
    owner: "Carol",
    days: 1,
    rate: 25000,
  },
  {
    id: 9,
    type: "consultant",
    category: "Governance & HR Review",
    activity: "Review Actual 2025 cases",
    owner: "Carol",
    days: 5,
    rate: 25000,
  },
  {
    id: 10,
    type: "consultant",
    category: "Governance & HR Review",
    activity: "Development of findings report",
    owner: "Carol",
    days: 2,
    rate: 25000,
  },
  {
    id: 12,
    type: "consultant",
    category: "Finance Processes",
    activity: "Review cash flow management",
    owner: "Rhoda",
    days: 1,
    rate: 25000,
  },
  {
    id: 13,
    type: "consultant",
    category: "Finance Processes",
    activity: "Observation of wastages",
    owner: "Rhoda",
    days: 1,
    rate: 25000,
  },
  {
    id: 14,
    type: "consultant",
    category: "Finance Processes",
    activity: "Review Risk management tools",
    owner: "Rhoda",
    days: 1,
    rate: 25000,
  },
  {
    id: 15,
    type: "consultant",
    category: "Finance Processes",
    activity: "Development of findings report",
    owner: "Rhoda",
    days: 2,
    rate: 25000,
  },
  {
    id: 16,
    type: "consultant",
    category: "Research",
    activity: "Management of research process (Fieldwork)",
    owner: "Kelvin",
    days: 7,
    rate: 2000,
  },
  {
    id: 20,
    type: "consultant",
    category: "Research",
    activity: "Local, regional, developed-market research",
    owner: "Kelvin",
    days: 2,
    rate: 10000,
  },
  {
    id: 21,
    type: "consultant",
    category: "Consolidation",
    activity: "Review of findings & Validation",
    owner: "All",
    days: 1,
    rate: 10000,
  },
  {
    id: 22,
    type: "consultant",
    category: "Consolidation",
    activity: "Final report & Presentation",
    owner: "All",
    days: 1,
    rate: 10000,
  },
];

const INITIAL_ASSISTANTS = [
  {
    id: 101,
    type: "assistant",
    owner: "Carol",
    activity: "Documentation Assistant",
    count: 1,
    days: 5,
    rate: 1500,
  },
  {
    id: 102,
    type: "assistant",
    owner: "Kelvin",
    activity: "Field Interviews/Observation (3 Assts)",
    count: 3,
    days: 7,
    rate: 4500,
  },
];

const formatCurrency = (amount) => {
  return new Intl.NumberFormat("en-KE", {
    style: "currency",
    currency: "KES",
    minimumFractionDigits: 0,
  }).format(amount);
};

const formatWithCommas = (num) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export default function WorkplanApp() {
  const [consultants, setConsultants] = useState(INITIAL_CONSULTANTS);
  const [assistants, setAssistants] = useState(INITIAL_ASSISTANTS);
  const [taxRate, setTaxRate] = useState(5);
  const [marginRate, setMarginRate] = useState(10);
  const [ownerFilter, setOwnerFilter] = useState("All");

  const ownersList = ["All", "Alice", "Carol", "Rhoda", "Kelvin"];

  const handleConsultantChange = (id, field, value) => {
    setConsultants((prev) =>
      prev.map((row) =>
        row.id === id
          ? { ...row, [field]: Number(value.replace(/,/g, "")) }
          : row,
      ),
    );
  };

  const handleAssistantChange = (id, field, value) => {
    setAssistants((prev) =>
      prev.map((row) =>
        row.id === id
          ? { ...row, [field]: Number(value.replace(/,/g, "")) }
          : row,
      ),
    );
  };

  const handleReset = () => {
    setConsultants(INITIAL_CONSULTANTS);
    setAssistants(INITIAL_ASSISTANTS);
    setTaxRate(5);
    setMarginRate(10);
    setOwnerFilter("All");
  };

  const totals = useMemo(() => {
    let subTotal = 0;
    let totalDays = 0;
    const byOwner = {
      Alice: 0,
      Carol: 0,
      Rhoda: 0,
      Kelvin: 0,
      All: 0,
      Assistants: 0,
    };

    consultants.forEach((c) => {
      const cost = c.days * c.rate;
      if (
        ownerFilter === "All" ||
        c.owner === ownerFilter ||
        c.owner === "All"
      ) {
        subTotal += cost;
        totalDays += c.days;
      }
      if (c.owner in byOwner) byOwner[c.owner] += cost;
    });

    assistants.forEach((a) => {
      const cost = a.count * a.days * a.rate;
      if (ownerFilter === "All" || a.owner === ownerFilter) {
        subTotal += cost;
      }
      byOwner.Assistants += cost;
    });

    const taxAmount = subTotal * (taxRate / 100);
    const marginAmount = subTotal * (marginRate / 100);

    return {
      subTotal,
      taxAmount,
      marginAmount,
      grandTotal: subTotal + taxAmount + marginAmount,
      totalDays,
      byOwner,
    };
  }, [consultants, assistants, ownerFilter, taxRate, marginRate]);

  const filteredConsultants = useMemo(
    () =>
      ownerFilter === "All"
        ? consultants
        : consultants.filter(
            (c) => c.owner === ownerFilter || c.owner === "All",
          ),
    [consultants, ownerFilter],
  );

  const filteredAssistants = useMemo(
    () =>
      ownerFilter === "All"
        ? assistants
        : assistants.filter((a) => a.owner === ownerFilter),
    [assistants, ownerFilter],
  );

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans text-slate-800">
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @media print {
          .no-print { display: none !important; }
          .card-border { border: 1px solid #e2e8f0 !important; box-shadow: none !important; }
          input { border: none !important; background: transparent !important; text-align: right !important; }
        }
      `,
        }}
      />

      {/* Header & Filter Bar */}
      <div className="max-w-7xl mx-auto mb-8 space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white p-6 rounded-2xl shadow-sm border border-slate-200 no-print">
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight uppercase">
              Double M Workplan
            </h1>
            <p className="text-slate-500 text-sm mt-1">
              Manage individual owner costs and assistant allocation.
            </p>
          </div>
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            {ownerFilter === "All" && (
              <div className="flex items-center gap-4 border-r pr-4 border-slate-200">
                <div className="flex flex-col">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                    Tax %
                  </label>
                  <input
                    type="number"
                    value={taxRate}
                    onChange={(e) => setTaxRate(Number(e.target.value))}
                    className="w-16 px-2 py-1.5 border border-slate-200 rounded-lg text-sm font-bold bg-slate-50"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                    Margin %
                  </label>
                  <input
                    type="number"
                    value={marginRate}
                    onChange={(e) => setMarginRate(Number(e.target.value))}
                    className="w-16 px-2 py-1.5 border border-slate-200 rounded-lg text-sm font-bold bg-slate-50"
                  />
                </div>
              </div>
            )}
            <div className="flex gap-2">
              <button
                onClick={handleReset}
                className="p-2 text-slate-400 hover:text-slate-600 transition-colors"
              >
                <RefreshCcw size={20} />
              </button>
              <button
                onClick={() => window.print()}
                className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all shadow-md active:scale-95"
              >
                <Printer size={18} /> Export PDF
              </button>
            </div>
          </div>
        </div>

        {/* Improved Filter Selection */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 flex flex-col md:flex-row items-center gap-4 no-print">
          <div className="flex items-center gap-2 text-slate-400 font-bold text-xs uppercase tracking-widest px-2 border-r border-slate-100 mr-2">
            <Filter size={14} /> View Member
          </div>
          <div className="flex flex-wrap gap-2">
            {ownersList.map((name) => (
              <button
                key={name}
                onClick={() => setOwnerFilter(name)}
                className={`px-4 py-2 rounded-xl text-sm font-bold transition-all border ${
                  ownerFilter === name
                    ? "bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-100"
                    : "bg-white border-slate-200 text-slate-600 hover:border-blue-300 hover:text-blue-500"
                }`}
              >
                {name}
              </button>
            ))}
          </div>
          {ownerFilter !== "All" && (
            <div className="ml-auto flex items-center gap-2 text-xs text-blue-600 font-bold bg-blue-50 px-4 py-2 rounded-full border border-blue-100">
              <span className="w-2 h-2 bg-blue-500 rounded-full animate-ping" />
              Viewing {ownerFilter}'s Net Allocation
            </div>
          )}
        </div>
      </div>

      {/* Stats Dashboard */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">
            Total Days
          </div>
          <div className="text-2xl font-black text-slate-900">
            {totals.totalDays.toFixed(1)}{" "}
            <span className="text-sm font-normal text-slate-400">Days</span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">
            Subtotal Net
          </div>
          <div className="text-2xl font-black text-slate-900">
            {formatCurrency(totals.subTotal)}
          </div>
        </div>
        {ownerFilter === "All" && (
          <>
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <div className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">
                Org Margin ({marginRate}%)
              </div>
              <div className="text-2xl font-black text-purple-600">
                {formatCurrency(totals.marginAmount)}
              </div>
            </div>
            <div className="bg-emerald-600 p-6 rounded-2xl border border-emerald-500 shadow-lg shadow-emerald-100">
              <div className="text-emerald-100 text-xs font-bold uppercase tracking-wider mb-1">
                Project Total Quote
              </div>
              <div className="text-2xl font-black text-white">
                {formatCurrency(totals.grandTotal)}
              </div>
            </div>
          </>
        )}
      </div>

      {/* Tables Section */}
      <div className="max-w-7xl mx-auto space-y-12 pb-20">
        {/* Consultants Table */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <UserCircle className="text-blue-500" size={24} />
            <h2 className="text-lg font-black text-slate-800 uppercase tracking-tight">
              Professional Fees (Consultants)
            </h2>
          </div>
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <table className="w-full text-left text-sm border-collapse">
              <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-[10px] tracking-widest border-b border-slate-100">
                <tr>
                  <th className="px-6 py-4">Activity</th>
                  <th className="px-6 py-4">Owner</th>
                  <th className="px-6 py-4 text-center w-24">Days</th>
                  <th className="px-6 py-4 text-right w-44">
                    Daily Rate (KES)
                  </th>
                  <th className="px-6 py-4 text-right w-44">Subtotal</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredConsultants.map((row) => (
                  <tr
                    key={row.id}
                    className="hover:bg-slate-50 transition-colors group"
                  >
                    <td className="px-6 py-4">
                      <div className="font-bold text-slate-900">
                        {row.activity}
                      </div>
                      <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wide">
                        {row.category}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-1 rounded-md text-[10px] font-black uppercase ${row.owner === "All" ? "bg-slate-200 text-slate-600" : "bg-blue-100 text-blue-700"}`}
                      >
                        {row.owner}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <input
                        type="number"
                        step="0.5"
                        value={row.days}
                        onChange={(e) =>
                          handleConsultantChange(row.id, "days", e.target.value)
                        }
                        className="w-full text-center bg-transparent border-b border-transparent group-hover:border-slate-200 focus:border-blue-500 focus:outline-none font-bold py-1"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="relative group/input">
                        <input
                          type="text"
                          value={formatWithCommas(row.rate)}
                          onChange={(e) =>
                            handleConsultantChange(
                              row.id,
                              "rate",
                              e.target.value,
                            )
                          }
                          className="w-full text-right bg-transparent border-b border-transparent group-hover:border-slate-200 focus:border-blue-500 focus:outline-none font-black py-1"
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right font-black text-slate-900">
                      {formatCurrency(row.days * row.rate)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Assistants Table */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <Users className="text-orange-500" size={24} />
            <h2 className="text-lg font-black text-slate-800 uppercase tracking-tight">
              Support Staff (Assistants)
            </h2>
          </div>
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <table className="w-full text-left text-sm border-collapse">
              <thead className="bg-orange-50/50 text-orange-700 font-bold uppercase text-[10px] tracking-widest border-b border-orange-100">
                <tr>
                  <th className="px-6 py-4">Support Activity</th>
                  <th className="px-6 py-4">Managing Consultant</th>
                  <th className="px-6 py-4 text-center w-24">Count</th>
                  <th className="px-6 py-4 text-center w-24">Days</th>
                  <th className="px-6 py-4 text-right w-44">Rate/Day (KES)</th>
                  <th className="px-6 py-4 text-right w-44">Subtotal</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredAssistants.map((row) => (
                  <tr
                    key={row.id}
                    className="hover:bg-orange-50/30 transition-colors group"
                  >
                    <td className="px-6 py-4 font-bold text-slate-900">
                      {row.activity}
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded-md text-[10px] font-black uppercase">
                        {row.owner}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <input
                        type="number"
                        value={row.count}
                        onChange={(e) =>
                          handleAssistantChange(row.id, "count", e.target.value)
                        }
                        className="w-full text-center bg-transparent border-b border-transparent group-hover:border-orange-200 focus:border-orange-500 focus:outline-none font-bold py-1"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <input
                        type="number"
                        value={row.days}
                        onChange={(e) =>
                          handleAssistantChange(row.id, "days", e.target.value)
                        }
                        className="w-full text-center bg-transparent border-b border-transparent group-hover:border-orange-200 focus:border-orange-500 focus:outline-none font-bold py-1"
                      />
                    </td>
                    <td className="px-6 py-4 text-right">
                      <input
                        type="text"
                        value={formatWithCommas(row.rate)}
                        onChange={(e) =>
                          handleAssistantChange(row.id, "rate", e.target.value)
                        }
                        className="w-full text-right bg-transparent border-b border-transparent group-hover:border-orange-200 focus:border-orange-500 focus:outline-none font-black py-1"
                      />
                    </td>
                    <td className="px-6 py-4 text-right font-black text-slate-900">
                      {formatCurrency(row.count * row.days * row.rate)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Global Summary (Only Full View) */}
        {ownerFilter === "All" && (
          <div className="bg-slate-900 text-white p-10 rounded-3xl shadow-2xl flex flex-col md:flex-row justify-between items-center gap-8 border border-slate-800">
            <div className="space-y-4 w-full md:w-auto">
              <h3 className="text-xl font-black uppercase tracking-tighter border-b border-slate-700 pb-3 flex items-center gap-2">
                <DollarSign size={20} className="text-emerald-400" />
                Final Quote Summary
              </h3>
              <div className="grid grid-cols-2 gap-x-12 gap-y-3 text-sm">
                <span className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">
                  Net Project Fees
                </span>
                <span className="text-right font-black">
                  {formatCurrency(totals.subTotal)}
                </span>
                <span className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">
                  WHT Tax ({taxRate}%)
                </span>
                <span className="text-right text-red-400">
                  +{formatCurrency(totals.taxAmount)}
                </span>
                <span className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">
                  Org Margin ({marginRate}%)
                </span>
                <span className="text-right text-purple-400">
                  +{formatCurrency(totals.marginAmount)}
                </span>
              </div>
            </div>
            <div className="text-center md:text-right border-t md:border-t-0 md:border-l border-slate-700 pt-8 md:pt-0 md:pl-12 w-full md:w-auto">
              <div className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-400 mb-2">
                Grand Total Investment
              </div>
              <div className="text-5xl font-black text-white tracking-tighter">
                {formatCurrency(totals.grandTotal)}
              </div>
              <div className="text-[10px] text-slate-500 mt-2 font-bold uppercase tracking-widest">
                Inclusive of taxes & operations margin
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
