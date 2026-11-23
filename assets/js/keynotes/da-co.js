// Offline key notes: DA · Calculus & Optimization. Keys are chapter ids from data.js.
import { CONTENT as EM } from './em.js';

const C = EM.calculus.sections;

export const CONTENT = {
  limits: {
    overview: 'Functions of a single variable: limits, continuity and differentiability.',
    sections: [
      C.find((s) => s[0] === 'Limits, continuity and differentiability'),
      ['Derivatives', [
        'd/dx xⁿ = nxⁿ⁻¹; eˣ → eˣ; ln x → 1/x; sin x → cos x; aˣ → aˣ ln a.',
        'Product, quotient and chain rules. Implicit differentiation for relations like x² + y² = 1.',
        'Sigmoid σ(x) = 1/(1 + e^(−x)) has σ′ = σ(1 − σ); tanh′ = 1 − tanh².',
      ]],
    ],
    exam: ['Limit of an indeterminate form (NAT).', 'Continuity or differentiability of a piecewise function.'],
    traps: ['A function can be continuous but not differentiable (|x| at 0).'],
  },

  taylor: {
    overview: 'Taylor and Maclaurin series and approximation error.',
    sections: [
      ['Taylor and Maclaurin series', [
        'f(x) = Σ f⁽ⁿ⁾(a)(x − a)ⁿ/n!. Maclaurin: a = 0.',
        'eˣ = 1 + x + x²/2! + …; sin x = x − x³/3! + …; cos x = 1 − x²/2! + …; ln(1 + x) = x − x²/2 + x³/3 − … (|x| < 1); 1/(1 − x) = 1 + x + x² + …',
        'Multivariate second-order: f(x + h) ≈ f(x) + ∇fᵀh + ½hᵀHh (H = Hessian).',
      ]],
      ['Approximation error', [
        'Lagrange remainder: Rₙ = f⁽ⁿ⁺¹⁾(c)(x − a)ⁿ⁺¹/(n + 1)! for some c between a and x.',
        'For alternating series with decreasing terms, the error is less than the first omitted term.',
        'Linear approximation f(x) ≈ f(a) + f′(a)(x − a) underlies gradient descent and Newton’s method.',
      ]],
    ],
    exam: ['Coefficient of a term in a Taylor expansion (NAT).', 'Bound on the error of a truncated series.'],
    traps: ['Forgetting the factorial in the denominator of Taylor coefficients.'],
  },

  optimisation: {
    overview: 'Optimisation: maxima and minima, single-variable optimisation, and gradient descent basics.',
    sections: [
      C.find((s) => s[0] === 'Maxima and minima'),
      ['Convexity', [
        'f is convex if f″ ≥ 0 (one variable) or the Hessian is positive semi-definite. A local minimum of a convex function is global.',
        'Sum of convex functions is convex; a maximum of convex functions is convex.',
        'Constrained optimisation with equality constraints: Lagrange multipliers ∇f = λ∇g.',
      ]],
      ['Gradient descent basics', [
        'Update xₖ₊₁ = xₖ − η∇f(xₖ). Too large a learning rate η diverges; too small is slow.',
        'For f(x) = ½ax² the iteration converges iff 0 < η < 2/a.',
        'Stochastic gradient descent uses a mini-batch estimate of the gradient. Momentum and Adam speed convergence.',
        'Newton’s method: xₖ₊₁ = xₖ − f′(xₖ)/f″(xₖ) (or H⁻¹∇f), quadratic convergence near the optimum.',
      ]],
    ],
    exam: ['Location or value of a maximum/minimum (NAT).', 'One or two steps of gradient descent.', 'Range of learning rates that converge.'],
    traps: ['Missing end-point checks on a closed interval.'],
  },
};
