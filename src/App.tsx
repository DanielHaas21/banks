import { useEffect, useMemo, useState } from "react";
import { formatToCZK } from "./utils/formatToCZK";
import type { taxRate } from "./types/taxRate";
import { calculateAmount } from "./utils/calculateAmount";
import { BANK_RATES, type BankName } from "./types/Banks";

// googled, may be slightly innacurate
const MONTHLY_INCOME = 49402;

export default function App() {
  const [amountInput, setAmountInput] = useState<string>("100000"); // left as string so the input can be empty
  const [selectedBank, setSelectedBank] = useState<BankName>("Moneta");
  const [taxRate, setTaxRate] = useState<taxRate>(0.15);

  // safe input checking and converting
  const parsedAmount = parseFloat(amountInput);
  const amount = Number.isFinite(parsedAmount) ? parsedAmount : 0;

  // List of possible banks and their data
  const bankData = useMemo(
    () =>
      Object.entries(BANK_RATES)
        .map(([bank, rate]) => ({
          bank: bank as BankName, // just to be sure
          rate,
          ...calculateAmount(amount, rate, taxRate),
        }))
        .sort((a, b) => b.total - a.total),
    [amount, taxRate]
  );

  // selected bank
  const selected = useMemo(() => {
    return bankData.find((r) => r.bank === selectedBank) ?? bankData[0] ?? null;
  }, [bankData, selectedBank]);

  // useEffect to change the tax rate for high income individuals
  useEffect(() => {
    const rate = amount > MONTHLY_INCOME * 36 ? 0.23 : 0.15;
    setTaxRate(rate);
  }, [amount]);

  const options = Object.entries(BANK_RATES).map(([bank, rate]) => (
    <option key={bank} value={bank}>
      {bank} — {rate}% p.a.
    </option>
  ));

  const banklist = bankData.map((r) => (
    <tr
      key={r.bank}
      className={r.bank === selected.bank ? "font-medium bg-blue-50" : ""}
    >
      <td className="py-2">
        {r.bank} ({r.rate}%)
      </td>
      <td>{formatToCZK(r.interest)}</td>
      <td>{formatToCZK(r.tax)}</td>
      <td>{formatToCZK(r.total)}</td>
    </tr>
  ));

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">
        Kalkulačka termínovaných vkladů (1 rok)
      </h1>
      <p className="text-gray-600 mb-6">
        Zadej částku a vyber banku. Aplikace ukáže úrok, daň a výslednou částku
        po 1 roce.
      </p>

      <div className="bg-white p-6 rounded-xl shadow-lg space-y-6">
        {/* Inputs */}
        <div className="flex flex-col md:flex-row gap-6 items-end">
          <label className="flex-1">
            <span className="text-gray-700 font-medium">Částka (CZK)</span>
            <input
              type="number"
              step={100}
              value={amountInput}
              onChange={(e) => {
                setAmountInput(e.target.value);
              }}
              className="mt-2 w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-200"
            />
          </label>

          <label className="flex-1">
            <span className="text-gray-700 font-medium">Banka</span>
            <select
              value={selectedBank}
              onChange={(e) => setSelectedBank(e.target.value as BankName)}
              className="mt-2 w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-200"
            >
              {options}
            </select>
          </label>
        </div>

        {/* Results */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Selected bank */}
          <div className="p-6 border rounded-xl shadow-sm bg-gray-50">
            <h2 className="text-xl font-semibold mb-4">
              Výpočet pro vybranou banku
            </h2>
            <p className="text-gray-700">
              Banka: <strong>{selected.bank}</strong> — {selected.rate}% p.a.
            </p>
            <div className="mt-4 space-y-2 text-gray-800">
              <div>
                Úroky: <strong>{formatToCZK(selected.interest)}</strong>
              </div>
              <div>
                Daň ({taxRate * 100}%):&nbsp;
                <strong>{formatToCZK(selected.tax)}</strong>
              </div>
              <div>
                Celkem po 1 roce: <strong>{formatToCZK(selected.total)}</strong>
              </div>
            </div>
          </div>

          {/* Comparison table */}
          <div className="p-6 border rounded-xl shadow-sm bg-gray-50 overflow-x-auto">
            <h2 className="text-xl font-semibold mb-4">Rychlé srovnání</h2>
            <table className="w-full text-left text-gray-700">
              <thead>
                <tr className="border-b border-gray-300">
                  <th className="py-2">Banka</th>
                  <th>Úrok</th>
                  <th>Daň</th>
                  <th>Celkem</th>
                </tr>
              </thead>
              <tbody>{banklist}</tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
