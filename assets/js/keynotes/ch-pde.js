// Offline key notes: CH · Plant Design & Economics. Keys are chapter ids from data.js.
export const CONTENT = {
  cost: {
    overview: 'Cost estimation: capital and operating costs, scaling equipment cost with the six-tenths rule, and updating with cost indices.',
    sections: [
      ['Capital and operating costs', [
        'Total capital investment = fixed capital (direct + indirect plant costs) + working capital (typically 10–20% of total).',
        'Lang factor: fixed capital ≈ factor × delivered equipment cost (≈ 3.1 solids, 3.6 solid–fluid, 4.7 fluid processing plants).',
        'Operating (manufacturing) cost = direct production costs (raw materials, utilities, labour) + fixed charges (depreciation, taxes, insurance) + plant overheads.',
        'Break-even point: fixed costs = (selling price − variable cost per unit) × units.',
      ]],
      ['Six-tenths rule and cost indices', [
        'Cost₂ = Cost₁ (Capacity₂/Capacity₁)^0.6 (exponent 0.6 typical; varies by equipment).',
        'Updating: Cost_now = Cost_then × (Index_now/Index_then) (CEPCI, Marshall & Swift, Nelson–Farrar).',
        'Economy of scale: doubling capacity raises cost by about 2^0.6 ≈ 1.52 times.',
      ]],
    ],
    exam: ['Scaled equipment cost using the six-tenths rule and an index (NAT).', 'Break-even production rate.'],
    traps: ['Applying the capacity ratio without the exponent.'],
  },

  depreciation: {
    overview: 'Depreciation methods and the time value of money: interest formulas, present and annual worth.',
    sections: [
      ['Depreciation methods', [
        'Straight line: d = (V − V_s)/n per year.',
        'Declining balance: fixed fraction f of the remaining book value each year; book value after a years = V(1 − f)ᵃ; Matheson: f = 1 − (V_s/V)^(1/n).',
        'Double declining balance: f = 2/n.',
        'Sum-of-years’ digits: year a depreciation = (n − a + 1)/(n(n + 1)/2) × (V − V_s).',
        'Sinking fund: annual deposit = (V − V_s) i/((1 + i)ⁿ − 1).',
      ]],
      ['Time value of money', [
        'Future value F = P(1 + i)ⁿ. Present value P = F/(1 + i)ⁿ.',
        'Continuous compounding F = Pe^(rn). Effective annual rate = (1 + r/m)ᵐ − 1.',
        'Annuity present worth P = A[(1 + i)ⁿ − 1]/(i(1 + i)ⁿ). Capital recovery factor A/P = i(1 + i)ⁿ/((1 + i)ⁿ − 1).',
        'Capitalised cost K = C_v + (C_R)/((1 + i)ⁿ − 1) (replacement every n years forever).',
      ]],
    ],
    exam: ['Book value after a few years by a given method (NAT).', 'Present worth or capitalised cost.'],
    traps: ['Using nominal instead of effective interest rate with sub-annual compounding.'],
  },

  profitability: {
    overview: 'Profitability analysis: payback period, return on investment, net present value, internal rate of return, and optimum design.',
    sections: [
      ['Payback period and ROI', [
        'Payback period = depreciable fixed investment / (annual profit + depreciation) (simple, ignores time value).',
        'Return on investment = annual net profit / total investment × 100.',
      ]],
      ['NPV and IRR', [
        'NPV = Σ cash flowₜ/(1 + i)ᵗ − initial investment. Accept if NPV > 0.',
        'IRR (discounted cash flow rate of return): the rate that makes NPV = 0. Accept if IRR > minimum acceptable rate.',
        'Mutually exclusive projects: compare incremental investment, or use NPV at the same rate.',
      ]],
      ['Optimum design', [
        'Minimise total annual cost = fixed charges (rise with size) + operating cost (fall with size). Optimum where the derivative is zero.',
        'Optimum pipe diameter balances pipe cost against pumping cost (≈ D ∝ Q^0.45ρ^0.13 for turbulent flow).',
        'Optimum insulation thickness, reflux ratio (≈ 1.2–1.5 × R_min) and number of evaporator effects follow the same trade-off.',
      ]],
    ],
    exam: ['Payback period or NPV (NAT).', 'Optimum value from a cost function.'],
    traps: ['Forgetting to add depreciation back to profit when computing payback.'],
  },
};
