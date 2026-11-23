// Offline key notes: DA · Probability & Statistics. Keys are chapter ids from data.js.
import { CONTENT as EM } from './em.js';

const P = EM.probability.sections;

export const CONTENT = {
  rv: {
    overview: 'Random variables: discrete and continuous variables, expectation and variance, joint distributions and covariance, and conditional expectation.',
    sections: [
      P.find((s) => s[0] === 'Random variables'),
      ['Joint distributions and covariance', [
        'Joint PMF/PDF; marginals by summing or integrating out the other variable. Independent iff f(x, y) = f_X(x)f_Y(y).',
        'Cov(X, Y) = E[XY] − E[X]E[Y]. Var(X + Y) = Var X + Var Y + 2Cov(X, Y).',
        'Correlation ρ = Cov/(σ_Xσ_Y) ∈ [−1, 1]. Independent ⇒ uncorrelated, but not the reverse (except for jointly Gaussian variables).',
        'Covariance matrix is symmetric positive semi-definite.',
      ]],
      ['Conditional expectation', [
        'E[X | Y = y] = Σ x p(x | y) or ∫ x f(x | y) dx.',
        'Law of total expectation: E[X] = E[E[X | Y]]. Law of total variance: Var X = E[Var(X | Y)] + Var(E[X | Y]).',
        'E[X | Y] is the best predictor of X from Y in mean-squared error.',
      ]],
    ],
    formulas: ['For non-negative integer X: E[X] = Σ P(X ≥ k) for k ≥ 1.', 'Markov: P(X ≥ a) ≤ E[X]/a. Chebyshev: P(|X − μ| ≥ kσ) ≤ 1/k².'],
    exam: ['Expectation or variance from a joint distribution (NAT).', 'Conditional expectation in a two-stage experiment.'],
    traps: ['Assuming zero covariance means independence.'],
  },

  distributions: {
    overview: 'Distributions: binomial, Poisson and geometric; uniform, exponential and normal; and t, chi-squared and the central limit theorem.',
    sections: [
      P.find((s) => s[0] === 'Standard distributions'),
      ['Sampling distributions and the CLT', [
        'Central limit theorem: the mean of n i.i.d. variables (mean μ, variance σ²) is approximately N(μ, σ²/n) for large n.',
        'Standard error of the mean = σ/√n.',
        'Chi-squared with k degrees of freedom = sum of k squared standard normals; mean k, variance 2k. (n − 1)s²/σ² ~ χ²ₙ₋₁.',
        'Student’s t: (x̄ − μ)/(s/√n) ~ tₙ₋₁; heavier tails than normal; approaches N(0, 1) as n grows.',
        'Poisson approximates binomial when n is large and p small (λ = np). Normal approximates binomial when np and n(1 − p) are both large (use continuity correction).',
      ]],
    ],
    formulas: ['Exponential is memoryless: P(X > s + t | X > s) = P(X > t). Geometric is its discrete counterpart.', 'Minimum of independent exponentials (rates λᵢ) is exponential with rate Σλᵢ.'],
    exam: ['Probability or moment of a standard distribution (NAT).', 'Applying the CLT to a sample mean.'],
    traps: ['Using σ instead of σ/√n for the spread of a sample mean.'],
  },

  testing: {
    overview: 'Hypothesis testing and estimation: confidence intervals, z-, t- and chi-squared tests, and correlation.',
    sections: [
      ['Confidence intervals', [
        'Known σ: x̄ ± z_(α/2) σ/√n (z = 1.96 for 95%, 2.576 for 99%). Unknown σ, small n: x̄ ± t_(α/2, n−1) s/√n.',
        'Proportion: p̂ ± z√(p̂(1 − p̂)/n). Wider intervals for higher confidence or smaller n.',
        'Sample variance s² = Σ(xᵢ − x̄)²/(n − 1) is unbiased.',
      ]],
      ['z-test, t-test and chi-squared test', [
        'Null H₀ vs alternative H₁. Type I error α = P(reject H₀ | H₀ true); Type II β = P(accept H₀ | H₁ true); power = 1 − β.',
        'p-value: probability, under H₀, of a result at least as extreme as observed. Reject H₀ if p < α.',
        'z-test: known σ or large n. One-sample t-test: unknown σ, df = n − 1. Two-sample t-test (pooled, df = n₁ + n₂ − 2); paired t-test on differences.',
        'Chi-squared goodness of fit: Σ(O − E)²/E with df = categories − 1 − estimated parameters. Independence test in an r × c table: df = (r − 1)(c − 1).',
      ]],
      ['Correlation and covariance', [
        'Sample correlation r = Σ(x − x̄)(y − ȳ)/√(Σ(x − x̄)² Σ(y − ȳ)²).',
        'r measures linear association only; r² is the fraction of variance explained by a simple linear fit.',
        'Spearman rank correlation for monotone, non-linear relationships.',
      ]],
    ],
    exam: ['Confidence interval for a mean (NAT).', 'Test statistic and decision for a z- or t-test.', 'Degrees of freedom for a chi-squared test.'],
    traps: ['Saying a 95% CI has a 95% chance of containing μ after it is computed; the 95% refers to the procedure.'],
  },

  bayes: {
    overview: 'Counting and probability axioms, conditional probability and independence, and applying Bayes’ theorem.',
    sections: [
      ['Counting and axioms', [
        'Axioms: P(A) ≥ 0, P(S) = 1, additivity for disjoint events. P(Aᶜ) = 1 − P(A).',
        'ⁿPᵣ = n!/(n − r)!, ⁿCᵣ = n!/(r!(n − r)!). Equally likely outcomes: P = favourable/total.',
        'Inclusion–exclusion: P(A ∪ B ∪ C) = ΣP(A) − ΣP(A ∩ B) + P(A ∩ B ∩ C).',
      ]],
      P.find((s) => s[0] === 'Basics and conditional probability'),
      ["Applying Bayes' theorem", [
        'Draw a tree: prior P(Aᵢ), likelihood P(B | Aᵢ); posterior = (prior × likelihood)/evidence.',
        'Base-rate effect: a 99%-accurate test for a 1-in-1000 condition gives a positive predictive value of only about 9%.',
        'Odds form: posterior odds = prior odds × likelihood ratio.',
        'Pairwise independence does not imply mutual independence of three events.',
      ]],
    ],
    exam: ['Posterior probability in a diagnostic test or defective-item problem (NAT).', 'Is a pair of events independent?'],
    traps: ['Ignoring the base rate (prior) when interpreting a positive test.'],
  },
};
