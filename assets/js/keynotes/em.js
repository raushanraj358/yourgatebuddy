// Offline key notes: Engineering Mathematics. Shared by every paper that has it; CS uses linear-algebra, calculus and
// probability (its sub-topics such as LU decomposition and named distributions are covered here too). Keys are chapter ids.
export const CONTENT = {
  'linear-algebra': {
    overview: 'Linear algebra is the most reliable scorer in Engineering Mathematics: determinants, rank, systems of equations and eigenvalues appear in almost every paper. Most questions need one property, not a long calculation.',
    sections: [
      ['Matrices and determinants', [
        'det(AB) = det(A)·det(B); det(Aᵀ) = det(A); det(kA) = kⁿ det(A) for an n × n matrix; det(A⁻¹) = 1/det(A).',
        'Swapping two rows changes the sign; adding a multiple of one row to another leaves det unchanged.',
        'A⁻¹ = adj(A)/det(A); (AB)⁻¹ = B⁻¹A⁻¹. Triangular matrix: det is the product of the diagonal.',
        'Symmetric: A = Aᵀ. Skew-symmetric: A = −Aᵀ (odd order ⇒ det = 0). Orthogonal: AᵀA = I, det = ±1.',
      ]],
      ['Rank and linear systems', [
        'Rank = number of non-zero rows in row-echelon form = number of linearly independent rows (or columns).',
        'Ax = b is consistent iff rank(A) = rank([A | b]). Unique solution if that rank equals n (unknowns); infinitely many if it is less than n.',
        'Ax = 0 always has the trivial solution; non-trivial solutions exist iff rank(A) < n, i.e. det(A) = 0 for square A. Nullity = n − rank.',
        '**LU decomposition:** A = LU with L lower and U upper triangular (Doolittle: L has 1s on the diagonal; Crout: U has 1s). Solve Ly = b, then Ux = y.',
      ]],
      ['Eigenvalues and eigenvectors', [
        'Solve det(A − λI) = 0. Sum of eigenvalues = trace; product = det(A).',
        'Eigenvalues of Aᵏ are λᵏ; of A⁻¹ are 1/λ; of A + kI are λ + k; of kA are kλ. A and Aᵀ have the same eigenvalues.',
        'Triangular or diagonal matrices: eigenvalues are the diagonal entries.',
        'Real symmetric matrices: real eigenvalues; eigenvectors of distinct eigenvalues are orthogonal. Skew-symmetric: zero or purely imaginary eigenvalues. Orthogonal: |λ| = 1.',
        '**Cayley–Hamilton:** every square matrix satisfies its own characteristic equation (useful for A⁻¹ and Aⁿ).',
        'Eigenvectors of distinct eigenvalues are linearly independent; a matrix is diagonalisable iff it has n independent eigenvectors.',
      ]],
    ],
    formulas: ['Rank(AB) ≤ min(rank A, rank B).', 'A non-zero outer product uvᵀ has rank 1; its eigenvalues are vᵀu and n − 1 zeros.', 'For a 2 × 2 matrix: λ² − (trace)λ + det = 0.'],
    exam: ['Eigenvalues of a given 3 × 3 matrix (often triangular or with obvious structure).', 'Conditions on a parameter for no / unique / infinite solutions.', 'NAT questions on rank or determinant of patterned matrices.'],
    traps: ['A zero eigenvalue means the matrix is singular; it does not mean the eigenvector is zero (eigenvectors are never zero).', 'Rank of an n × n all-ones matrix is 1, not n.'],
  },

  calculus: {
    overview: 'Calculus questions test limits, continuity and differentiability, mean value theorems, maxima and minima, definite integrals and (for non-CS papers) vector calculus. Most can be solved with standard results rather than long working.',
    sections: [
      ['Limits, continuity and differentiability', [
        'Standard limits: sin x/x → 1, (1 − cos x)/x² → 1/2, (eˣ − 1)/x → 1, (1 + x)^(1/x) → e as x → 0.',
        "L'Hôpital's rule for 0/0 or ∞/∞: differentiate numerator and denominator separately.",
        'Continuous at a: left limit = right limit = f(a). Differentiable ⇒ continuous, but not the reverse (|x| at 0).',
      ]],
      ['Mean value theorems', [
        "**Rolle's:** f continuous on [a, b], differentiable on (a, b), f(a) = f(b) ⇒ f′(c) = 0 for some c in (a, b).",
        "**Lagrange's MVT:** f′(c) = (f(b) − f(a))/(b − a).",
        "**Cauchy's MVT:** f′(c)/g′(c) = (f(b) − f(a))/(g(b) − g(a)).",
      ]],
      ['Maxima and minima', [
        'One variable: f′(x) = 0; f″ < 0 ⇒ maximum, f″ > 0 ⇒ minimum. On a closed interval, also check the end points.',
        'Two variables: with r = fₓₓ, s = fₓᵧ, t = fᵧᵧ at a stationary point, rt − s² > 0 and r < 0 ⇒ maximum; r > 0 ⇒ minimum; rt − s² < 0 ⇒ saddle point.',
      ]],
      ['Integration', [
        '∫₀^a f(x) dx = ∫₀^a f(a − x) dx. For odd f, ∫₋a^a f = 0; for even f, it is 2∫₀^a f.',
        'Wallis: ∫₀^(π/2) sinⁿx dx = [(n − 1)(n − 3)…]/[n(n − 2)…] × (π/2 if n is even, 1 if odd).',
        'Improper integrals: ∫₁^∞ dx/xᵖ converges iff p > 1; ∫₀¹ dx/xᵖ converges iff p < 1. ∫₀^∞ e^(−x²) dx = √π/2.',
      ]],
      ['Vector calculus', [
        'grad φ = ∇φ is normal to the surface φ = c; the directional derivative along unit vector â is ∇φ · â.',
        'div F = ∇ · F; curl F = ∇ × F. curl(grad φ) = 0 and div(curl F) = 0 always.',
        "**Gauss:** ∯ F · dS = ∭ ∇ · F dV. **Stokes:** ∮ F · dr = ∬ (∇ × F) · dS. **Green:** ∮ (M dx + N dy) = ∬ (∂N/∂x − ∂M/∂y) dx dy.",
        'F is conservative (irrotational) iff ∇ × F = 0; then the line integral depends only on the end points.',
      ]],
    ],
    formulas: ['d/dx(uv) = u′v + uv′; chain rule dy/dx = (dy/du)(du/dx).', 'Integration by parts: ∫u dv = uv − ∫v du.', "Euler's theorem: for f homogeneous of degree n, x fₓ + y fᵧ = n f."],
    exam: ['Limits with indeterminate forms and continuity of piecewise functions.', 'Maximum or minimum of a function on an interval (NAT).', 'Applying Gauss or Stokes theorem to turn a hard integral into an easy one.'],
    traps: ['Forgetting to check end points when finding the absolute maximum on a closed interval.', 'f′(c) = 0 does not guarantee an extremum (x³ at 0 is an inflection point).'],
  },

  'differential-equations': {
    overview: 'Differential equations questions are mostly “identify the type and apply the standard method”: first-order linear and exact equations, constant-coefficient linear ODEs, Cauchy–Euler, Laplace transforms and the classic PDEs.',
    sections: [
      ['First-order ODEs', [
        '**Variable separable:** f(y) dy = g(x) dx, integrate both sides.',
        '**Linear:** dy/dx + P(x)y = Q(x). Integrating factor IF = e^(∫P dx); y·IF = ∫Q·IF dx + C.',
        '**Exact:** M dx + N dy = 0 is exact iff ∂M/∂y = ∂N/∂x. Bernoulli equations reduce to linear with v = y^(1 − n).',
        'Order = highest derivative; degree = power of the highest derivative once the equation is polynomial in derivatives.',
      ]],
      ['Higher-order linear ODEs (constant coefficients)', [
        'Auxiliary equation from D → m. Real distinct roots: c₁e^(m₁x) + c₂e^(m₂x). Repeated m: (c₁ + c₂x)e^(mx). Complex α ± iβ: e^(αx)(c₁ cos βx + c₂ sin βx).',
        'Solution = complementary function + particular integral. For f(x) = e^(ax), PI = e^(ax)/F(a); if F(a) = 0, multiply by x and differentiate F.',
        "**Cauchy–Euler:** x²y″ + axy′ + by = 0; substitute x = eᵗ (so xD → θ), or try y = xᵐ: m(m − 1) + am + b = 0.",
      ]],
      ['Laplace transform methods', [
        'L{1} = 1/s, L{tⁿ} = n!/sⁿ⁺¹, L{e^(at)} = 1/(s − a), L{sin at} = a/(s² + a²), L{cos at} = s/(s² + a²).',
        'L{f′} = sF(s) − f(0); L{f″} = s²F(s) − sf(0) − f′(0). This turns an IVP into algebra.',
        'Shifting: L{e^(at)f(t)} = F(s − a); L{f(t − a)u(t − a)} = e^(−as)F(s).',
      ]],
      ['PDEs', [
        'Heat (diffusion): uₜ = c²uₓₓ (parabolic). Wave: uₜₜ = c²uₓₓ (hyperbolic). Laplace: uₓₓ + uᵧᵧ = 0 (elliptic).',
        'Classification of Auₓₓ + Buₓᵧ + Cuᵧᵧ: B² − 4AC < 0 elliptic, = 0 parabolic, > 0 hyperbolic.',
        'Solved by separation of variables u = X(x)T(t) with boundary conditions giving Fourier series coefficients.',
      ]],
    ],
    formulas: ['Wronskian W(y₁, y₂) = y₁y₂′ − y₂y₁′; non-zero ⇒ solutions are independent.', 'Final value theorem: lim(t→∞) f(t) = lim(s→0) sF(s), if the poles of sF(s) are in the left half-plane.'],
    exam: ['Solving an IVP and reporting y at a given point (NAT).', 'Classifying a PDE or identifying the general solution form from the roots.'],
    traps: ['Using the integrating factor without first putting the equation in the form dy/dx + Py = Q (coefficient of dy/dx must be 1).', 'Forgetting the extra x when a root of the auxiliary equation repeats or when the forcing term matches a root.'],
  },

  'complex-variables': {
    overview: 'Complex variables carry 1–2 marks for most core branches: analytic functions, Cauchy–Riemann equations, Cauchy’s integral formula, series and the residue theorem for contour integrals.',
    sections: [
      ['Analytic functions', [
        'f(z) = u + iv is analytic where it is differentiable in a neighbourhood. Cauchy–Riemann: uₓ = vᵧ and uᵧ = −vₓ.',
        'Real and imaginary parts of an analytic function are harmonic: ∇²u = ∇²v = 0.',
        'f′(z) = uₓ + ivₓ. Polynomials, eᶻ, sin z, cos z are entire; z̄ and |z|² are not analytic.',
      ]],
      ['Cauchy’s theorem and integral formula', [
        "**Cauchy's theorem:** ∮ f(z) dz = 0 if f is analytic inside and on the closed curve C.",
        "**Integral formula:** ∮ f(z)/(z − a) dz = 2πi f(a); ∮ f(z)/(z − a)ⁿ⁺¹ dz = 2πi f⁽ⁿ⁾(a)/n!.",
      ]],
      ['Series and residues', [
        'Taylor series about a point of analyticity; Laurent series in an annulus has negative powers too.',
        'Singularities: removable, pole of order m, essential (infinitely many negative powers, e.g. e^(1/z) at 0).',
        'Residue = coefficient of 1/(z − a) in the Laurent series.',
        'Simple pole: Res = lim(z→a) (z − a)f(z) = p(a)/q′(a) for f = p/q. Pole of order m: (1/(m − 1)!) lim d^(m−1)/dz^(m−1) [(z − a)ᵐ f(z)].',
        '**Residue theorem:** ∮ f(z) dz = 2πi × (sum of residues inside C).',
      ]],
    ],
    formulas: ['|z| = √(x² + y²); z = re^(iθ); De Moivre: (cos θ + i sin θ)ⁿ = cos nθ + i sin nθ.', 'nth roots of unity sum to 0.'],
    exam: ['Contour integral around a circle: find which poles lie inside, add residues, multiply by 2πi.', 'Find v given u (harmonic conjugate) or test which function is analytic.'],
    traps: ['Including poles that lie outside the contour (check |a| against the radius, and the centre of the circle).', 'For a pole on the contour itself, the residue theorem does not apply directly.'],
  },

  probability: {
    overview: 'Probability and statistics is high-yield for every paper (and CS in particular). Expect conditional probability, Bayes’ theorem, expectation and variance, and the standard distributions.',
    sections: [
      ['Basics and conditional probability', [
        'P(A ∪ B) = P(A) + P(B) − P(A ∩ B). P(A | B) = P(A ∩ B)/P(B).',
        'Independent: P(A ∩ B) = P(A)P(B). Mutually exclusive: P(A ∩ B) = 0 (mutually exclusive events with non-zero probability are never independent).',
        "**Total probability:** P(B) = Σ P(B | Aᵢ)P(Aᵢ). **Bayes:** P(Aᵢ | B) = P(B | Aᵢ)P(Aᵢ)/Σ P(B | Aⱼ)P(Aⱼ).",
      ]],
      ['Random variables', [
        'E[X] = Σ x p(x) or ∫ x f(x) dx. Var(X) = E[X²] − (E[X])².',
        'E[aX + b] = aE[X] + b; Var(aX + b) = a²Var(X). E[X + Y] = E[X] + E[Y] always; Var(X + Y) = Var X + Var Y only if uncorrelated.',
        'A PDF integrates to 1 and is never negative; the CDF is non-decreasing from 0 to 1. Median m: F(m) = 1/2.',
      ]],
      ['Standard distributions', [
        '**Binomial(n, p):** P(k) = ⁿCₖ pᵏ(1 − p)ⁿ⁻ᵏ; mean np, variance np(1 − p).',
        '**Poisson(λ):** P(k) = e^(−λ)λᵏ/k!; mean = variance = λ.',
        '**Geometric:** trials until first success, P(k) = (1 − p)^(k−1)p, mean 1/p.',
        '**Uniform(a, b):** mean (a + b)/2, variance (b − a)²/12.',
        '**Exponential(λ):** f = λe^(−λx); mean 1/λ, variance 1/λ²; memoryless.',
        '**Normal(μ, σ²):** symmetric; about 68%, 95%, 99.7% within 1σ, 2σ, 3σ. Z = (X − μ)/σ.',
      ]],
      ['Descriptive statistics, correlation and regression', [
        'Mean, median and mode; for moderately skewed data, mode ≈ 3 median − 2 mean.',
        'Standard deviation is unchanged by adding a constant and scales by |a| when multiplied by a.',
        'Correlation r = Cov(X, Y)/(σₓσᵧ), between −1 and 1. Regression of y on x: slope b = r σᵧ/σₓ; the line passes through (x̄, ȳ).',
      ]],
    ],
    formulas: ['Cov(X, Y) = E[XY] − E[X]E[Y].', 'Sum of independent Poissons is Poisson with the rates added.', 'Expected number of trials to see all n coupons ≈ n(1 + 1/2 + … + 1/n).'],
    exam: ['Bayes problems framed as defective items from several machines or medical tests.', 'Expectation or variance of a given PDF/PMF (NAT).', 'Probability that a sum of dice or a draw of balls meets a condition.'],
    traps: ['Confusing P(A | B) with P(B | A); the whole point of Bayes is reversing them.', 'Treating “without replacement” draws as independent.'],
  },

  'numerical-methods': {
    overview: 'Numerical methods usually give one or two direct questions: an iteration of Newton–Raphson, a trapezoidal or Simpson’s rule value, or a step of Euler’s or Runge–Kutta method. Know the formulas and their error orders.',
    sections: [
      ['Roots of equations', [
        '**Bisection:** halve the interval where f changes sign; linear convergence; error after n steps ≤ (b − a)/2ⁿ.',
        '**Newton–Raphson:** xₙ₊₁ = xₙ − f(xₙ)/f′(xₙ); quadratic convergence near a simple root; fails if f′ ≈ 0.',
        '**Secant:** uses two previous points, order ≈ 1.618. **Regula falsi:** keeps the root bracketed, linear order.',
      ]],
      ['Numerical integration', [
        '**Trapezoidal:** h/2 [y₀ + 2(y₁ + … + yₙ₋₁) + yₙ]; error O(h²); exact for straight lines.',
        "**Simpson's 1/3:** h/3 [y₀ + 4(odd) + 2(even) + yₙ]; n must be even; error O(h⁴); exact for cubics.",
        "**Simpson's 3/8:** 3h/8 [y₀ + 3y₁ + 3y₂ + 2y₃ + …]; n a multiple of 3.",
      ]],
      ['ODEs and interpolation', [
        "**Euler:** yₙ₊₁ = yₙ + h f(xₙ, yₙ); first order. Modified Euler (Heun) is second order.",
        '**RK4:** k₁ = hf(x, y), k₂ = hf(x + h/2, y + k₁/2), k₃ = hf(x + h/2, y + k₂/2), k₄ = hf(x + h, y + k₃); y₁ = y₀ + (k₁ + 2k₂ + 2k₃ + k₄)/6.',
        '**Interpolation:** Newton forward/backward differences for equal spacing; Lagrange for unequal spacing. n + 1 points fix a polynomial of degree ≤ n.',
      ]],
    ],
    formulas: ['Newton–Raphson for √N: xₙ₊₁ = (xₙ + N/xₙ)/2.', 'Gauss–Seidel converges for a diagonally dominant matrix.'],
    exam: ['One or two Newton–Raphson iterations from a given start (NAT, rounded to two decimals).', 'Integral by trapezoidal or Simpson’s rule from a small table.'],
    traps: ['Using Simpson’s 1/3 rule with an odd number of intervals.', 'Counting points instead of intervals: 5 points means n = 4 intervals.'],
  },
};
