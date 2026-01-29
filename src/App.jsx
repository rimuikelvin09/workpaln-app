import React, { useState, useMemo } from "react";
import {
  RefreshCcw,
  DollarSign,
  Users,
  Percent,
  Briefcase,
  Printer,
  Calendar,
} from "lucide-react";

// Initial data transcribed from the uploaded image
const INITIAL_DATA = [
  {
    id: 1,
    category: "Interviews & Observations",
    activity: "Interview of all support staff",
    owner: "Alice",
    days: 3,
    consultantRate: 25000,
    assistantRate: 0,
  },
  {
    id: 2,
    category: "Interviews & Observations",
    activity: "Interview of selected drivers, conductors",
    owner: "Alice",
    days: 0,
    consultantRate: 25000,
    assistantRate: 0,
  },
  {
    id: 3,
    category: "Interviews & Observations",
    activity: "Development of findings report",
    owner: "Alice",
    days: 0,
    consultantRate: 25000,
    assistantRate: 0,
  },
  {
    id: 4,
    category: "Governance & HR Review",
    activity: "Review HR policies and procedures",
    owner: "Carol",
    days: 1,
    consultantRate: 25000,
    assistantRate: 0,
  },
  {
    id: 5,
    category: "Governance & HR Review",
    activity: "Review Governance structures",
    owner: "Carol",
    days: 1,
    consultantRate: 25000,
    assistantRate: 0,
  },
  {
    id: 6,
    category: "Governance & HR Review",
    activity: "Review Training Programs",
    owner: "Carol",
    days: 0.5,
    consultantRate: 25000,
    assistantRate: 0,
  },
  {
    id: 7,
    category: "Governance & HR Review",
    activity: "Review of Disciplinary Procedures",
    owner: "Carol",
    days: 0.5,
    consultantRate: 25000,
    assistantRate: 0,
  },
  {
    id: 8,
    category: "Governance & HR Review",
    activity: "Review of Legal/Compliance",
    owner: "Carol",
    days: 1,
    consultantRate: 25000,
    assistantRate: 0,
  },
  {
    id: 9,
    category: "Governance & HR Review",
    activity: "Review Actual 2025 cases",
    owner: "Carol",
    days: 5,
    consultantRate: 25000,
    assistantRate: 0,
  },
  {
    id: 10,
    category: "Governance & HR Review",
    activity: "Development of findings report",
    owner: "Carol",
    days: 2,
    consultantRate: 25000,
    assistantRate: 0,
  },
  {
    id: 11,
    category: "Governance & HR Review",
    activity: "Documenting assistant logic",
    owner: "Carol (Asst)",
    days: 5,
    consultantRate: 0,
    assistantRate: 1500,
  },
  {
    id: 12,
    category: "Finance Processes",
    activity: "Review cash flow management",
    owner: "Rhoda",
    days: 1,
    consultantRate: 25000,
    assistantRate: 0,
  },
  {
    id: 13,
    category: "Finance Processes",
    activity: "Observation of wastages",
    owner: "Rhoda",
    days: 1,
    consultantRate: 25000,
    assistantRate: 0,
  },
  {
    id: 14,
    category: "Finance Processes",
    activity: "Review Risk management tools",
    owner: "Rhoda",
    days: 1,
    consultantRate: 25000,
    assistantRate: 0,
  },
  {
    id: 15,
    category: "Finance Processes",
    activity: "Development of findings report",
    owner: "Rhoda",
    days: 2,
    consultantRate: 25000,
    assistantRate: 0,
  },
  {
    id: 16,
    category: "Research",
    activity: "Management of research process",
    owner: "Kelvin",
    days: 7,
    consultantRate: 2000,
    assistantRate: 4500,
  },
  {
    id: 17,
    category: "Research",
    activity: "Interview drivers/conductors (3 assts)",
    owner: "Kelvin",
    days: 0,
    consultantRate: 0,
    assistantRate: 0,
  },
  {
    id: 18,
    category: "Research",
    activity: "Observation of operational realities",
    owner: "Kelvin",
    days: 0,
    consultantRate: 0,
    assistantRate: 0,
  },
  {
    id: 19,
    category: "Research",
    activity: "Competitor experiential testing",
    owner: "Kelvin",
    days: 0,
    consultantRate: 0,
    assistantRate: 0,
  },
  {
    id: 20,
    category: "Consolidation",
    activity: "Local, regional, developed-market research",
    owner: "Kelvin",
    days: 2,
    consultantRate: 10000,
    assistantRate: 0,
  },
  {
    id: 21,
    category: "Consolidation",
    activity: "Review of findings & Validation",
    owner: "All",
    days: 1,
    consultantRate: 10000,
    assistantRate: 0,
  },
  {
    id: 22,
    category: "Consolidation",
    activity: "Final report & Presentation",
    owner: "All",
    days: 1,
    consultantRate: 10000,
    assistantRate: 0,
  },
];

const formatCurrency = (amount) => {
  return new Intl.NumberFormat("en-KE", {
    style: "currency",
    currency: "KES",
    minimumFractionDigits: 0,
  }).format(amount);
};

export default function WorkplanApp() {
  const [rows, setRows] = useState(INITIAL_DATA);
  const [taxRate, setTaxRate] = useState(5);
  const [marginRate, setMarginRate] = useState(10);

  const handleInputChange = (id, field, value) => {
    const updatedRows = rows.map((row) => {
      if (row.id === id) {
        return { ...row, [field]: Number(value) };
      }
      return row;
    });
    setRows(updatedRows);
  };

  const handleReset = () => {
    setRows(INITIAL_DATA);
    setTaxRate(5);
    setMarginRate(10);
  };

  const handlePrint = () => {
    window.print();
  };

  const totals = useMemo(() => {
    let subTotal = 0;
    let totalDays = 0;

    const byPerson = {
      Alice: 0,
      Carol: 0,
      Rhoda: 0,
      Kelvin: 0,
      Assistants: 0,
      "Shared/All": 0,
    };

    rows.forEach((row) => {
      const consultantCost = row.days * row.consultantRate;
      const assistantCost = row.days * row.assistantRate;
      const lineTotal = consultantCost + assistantCost;

      subTotal += lineTotal;
      totalDays += row.days;

      if (row.owner.includes("Alice")) byPerson.Alice += consultantCost;
      else if (row.owner.includes("Carol") && !row.owner.includes("Asst"))
        byPerson.Carol += consultantCost;
      else if (row.owner.includes("Rhoda")) byPerson.Rhoda += consultantCost;
      else if (row.owner.includes("Kelvin")) byPerson.Kelvin += consultantCost;
      else if (row.owner === "All") byPerson["Shared/All"] += consultantCost;

      byPerson["Assistants"] += assistantCost;
    });

    const taxAmount = subTotal * (taxRate / 100);
    const marginAmount = subTotal * (marginRate / 100);
    const grandTotal = subTotal + taxAmount + marginAmount;

    return {
      subTotal,
      taxAmount,
      marginAmount,
      grandTotal,
      totalDays,
      byPerson,
    };
  }, [rows, taxRate, marginRate]);

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 font-sans text-slate-800">
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @media print {
          @page { size: landscape; margin: 8mm; }
          .no-print { display: none !important; }
          body { background: white !important; padding: 0 !important; width: 100%; }
          .print-only { display: block !important; }
          .card-border { border: 1px solid #e2e8f0 !important; box-shadow: none !important; margin-bottom: 10px !important; }
          .table-container { border: 1px solid #e2e8f0 !important; width: 100% !important; overflow: visible !important; }
          table { width: 100% !important; table-layout: fixed !important; font-size: 10px !important; }
          th, td { padding: 4px 6px !important; word-wrap: break-word !important; }
          
          input { 
            border: none !important; 
            background: transparent !important; 
            pointer-events: none !important; 
            width: 100% !important; 
            font-size: 10px !important; 
            padding: 0 !important; 
            text-align: center !important; 
            margin: 0 !important;
          }

          .col-total { width: 110px !important; text-align: right !important; }
          .col-activity { width: auto !important; }
          .col-owner { width: 90px !important; }
          .col-days { width: 50px !important; }
          .col-rate { width: 85px !important; }
          
          .payout-dist { break-before: auto; }
          .final-summary-block { break-inside: avoid; margin-top: 30px; border-top: 2px solid #f1f5f9; padding-top: 20px; }
        }
        .print-only { display: none; }
      `,
        }}
      />

      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8 bg-white p-6 rounded-xl shadow-sm border border-slate-200 card-border">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              Double M Workplan Costing
            </h1>
            <p className="text-slate-500 text-sm mt-1 no-print">
              Adjust days, rates, taxes, and margins below.
            </p>
            <p className="text-slate-500 text-sm mt-1 print-only">
              Generated Workplan Report — {new Date().toLocaleDateString()}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 no-print">
            <div className="flex flex-col">
              <label className="text-xs font-semibold text-slate-500 mb-1">
                Tax Rate (%)
              </label>
              <div className="relative">
                <Percent
                  size={14}
                  className="absolute left-2 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  type="number"
                  value={taxRate}
                  onChange={(e) => setTaxRate(Number(e.target.value))}
                  className="w-24 pl-7 pr-2 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="flex flex-col">
              <label className="text-xs font-semibold text-slate-500 mb-1">
                Margin (%)
              </label>
              <div className="relative">
                <Percent
                  size={14}
                  className="absolute left-2 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  type="number"
                  value={marginRate}
                  onChange={(e) => setMarginRate(Number(e.target.value))}
                  className="w-24 pl-7 pr-2 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="flex gap-2 mt-5">
              <button
                onClick={handleReset}
                className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg text-sm font-medium transition-colors"
              >
                <RefreshCcw size={16} />
                Reset
              </button>
              <button
                onClick={handlePrint}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors shadow-sm"
              >
                <Printer size={16} />
                Export PDF
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Financial Summary Cards (No Print) */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8 no-print">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 card-border">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
              <Calendar size={20} />
            </div>
            <span className="text-slate-500 font-medium text-sm">
              Total Project Days
            </span>
          </div>
          <div className="text-xl font-bold text-slate-900">
            {totals.totalDays} Days
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 card-border">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-slate-100 rounded-lg text-slate-600">
              <Briefcase size={20} />
            </div>
            <span className="text-slate-500 font-medium text-sm">
              Net Project Cost
            </span>
          </div>
          <div className="text-xl font-bold text-slate-900">
            {formatCurrency(totals.subTotal)}
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 card-border">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-purple-50 rounded-lg text-purple-600">
              <Users size={20} />
            </div>
            <span className="text-slate-500 font-medium text-sm">
              Margin ({marginRate}%)
            </span>
          </div>
          <div className="text-xl font-bold text-slate-900">
            {formatCurrency(totals.marginAmount)}
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-emerald-200 bg-emerald-50/30 card-border">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-emerald-100 rounded-lg text-emerald-600">
              <DollarSign size={20} />
            </div>
            <span className="text-emerald-800 font-bold text-sm uppercase">
              Final Quote
            </span>
          </div>
          <div className="text-xl font-bold text-emerald-900">
            {formatCurrency(totals.grandTotal)}
          </div>
        </div>
      </div>

      {/* Main Table Content */}
      <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden table-container card-border">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 col-activity">Activity</th>
                <th className="px-6 py-4 col-owner">Owner</th>
                <th className="px-6 py-4 col-days">Days</th>
                <th className="px-6 py-4 col-rate">Cons. Rate</th>
                <th className="px-6 py-4 col-rate">Asst. Rate</th>
                <th className="px-6 py-4 text-right col-total">Line Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {rows.map((row) => (
                <tr
                  key={row.id}
                  className="hover:bg-slate-50 transition-colors"
                >
                  <td className="px-6 py-3 col-activity">
                    <div className="text-slate-900 font-medium">
                      {row.activity}
                    </div>
                    <div className="text-xs text-slate-400">{row.category}</div>
                  </td>
                  <td className="px-6 py-3 text-slate-600 col-owner">
                    {row.owner}
                  </td>
                  <td className="px-6 py-3 col-days text-center">
                    <input
                      type="number"
                      step="0.1"
                      value={row.days}
                      onChange={(e) =>
                        handleInputChange(row.id, "days", e.target.value)
                      }
                      className="w-full px-1 py-1 border border-slate-200 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 text-center"
                    />
                  </td>
                  <td className="px-6 py-3 col-rate">
                    <input
                      type="number"
                      value={row.consultantRate}
                      onChange={(e) =>
                        handleInputChange(
                          row.id,
                          "consultantRate",
                          e.target.value,
                        )
                      }
                      className="w-full px-1 py-1 border border-slate-200 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </td>
                  <td className="px-6 py-3 col-rate">
                    <input
                      type="number"
                      value={row.assistantRate}
                      onChange={(e) =>
                        handleInputChange(
                          row.id,
                          "assistantRate",
                          e.target.value,
                        )
                      }
                      className="w-full px-1 py-1 border border-slate-200 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </td>
                  <td className="px-6 py-3 text-right font-medium text-slate-900 col-total">
                    {formatCurrency(
                      row.days * row.consultantRate +
                        row.days * row.assistantRate,
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Final Summary and Quote Block - Shown at bottom of content */}
      <div className="max-w-7xl mx-auto final-summary-block">
        <div className="mt-8 flex flex-col md:flex-row gap-8 items-start">
          <div className="flex-1 payout-dist w-full">
            <h2 className="text-lg font-semibold text-slate-800 mb-4">
              Payout Distribution
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(totals.byPerson).map(([person, amount]) => (
                <div
                  key={person}
                  className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm card-border"
                >
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                    {person}
                  </div>
                  <div className="text-base font-bold text-slate-800">
                    {formatCurrency(amount)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full md:w-96 bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden card-border">
            <div className="p-6 space-y-4">
              {/* Added Total Days to the printed summary */}
              <div className="flex justify-between text-sm pb-2 border-b border-slate-50">
                <span className="text-slate-500 font-medium">
                  Total Project Duration
                </span>
                <span className="text-slate-900 font-bold">
                  {totals.totalDays} Days
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500 font-medium">
                  Subtotal (Net Cost)
                </span>
                <span className="text-slate-900 font-bold">
                  {formatCurrency(totals.subTotal)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500 font-medium">
                  Tax ({taxRate}%)
                </span>
                <span className="text-red-500">
                  +{formatCurrency(totals.taxAmount)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500 font-medium">
                  Legacy Makers Margin ({marginRate}%)
                </span>
                <span className="text-purple-600">
                  +{formatCurrency(totals.marginAmount)}
                </span>
              </div>
              <div className="pt-4 border-t border-slate-100">
                <div className="flex justify-between items-center">
                  <span className="text-base font-bold text-slate-900 uppercase tracking-tight">
                    Final Quote
                  </span>
                  <span className="text-2xl font-extrabold text-emerald-600">
                    {formatCurrency(totals.grandTotal)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-8 text-center text-slate-400 text-xs no-print">
        Tip: Set layout to "Landscape" in your print settings for the best PDF
        result.
      </div>
    </div>
  );
}
