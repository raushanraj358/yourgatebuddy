// Offline key notes: DA · Linear Algebra. Keys are chapter ids from data.js.
import { CONTENT as EM } from './em.js';

const L = EM['linear-algebra'].sections;

export const CONTENT = {
  spaces: {
    overview: 'Vector spaces: subspaces, span and basis, linear independence and dimension, and projections and orthogonality.',
    sections: [
      ['Subspaces, span and basis', [
        'A subspace contains 0 and is closed under addition and scalar multiplication. A line or plane not through the origin is not a subspace.',
        'Span = all linear combinations. A basis is a linearly independent spanning set; its size is the dimension.',
        'Four fundamental subspaces of an m × n matrix A of rank r: column space (dim r), row space (r), null space (n − r), left null space (m − r).',
        'Rank–nullity: rank + nullity = n (number of columns).',
      ]],
      ['Linear independence', [
        'Vectors are independent iff the only combination giving 0 has all coefficients 0; equivalently the matrix with them as columns has full column rank.',
        'More than n vectors in ℝⁿ are always dependent. n vectors in ℝⁿ are independent iff their determinant is non-zero.',
      ]],
      ['Projections and orthogonality', [
        'Projection of b on a: (aᵀb/aᵀa)a. Projection matrix onto the column space of A: P = A(AᵀA)⁻¹Aᵀ; P² = P and Pᵀ = P; eigenvalues 0 or 1.',
        'Least squares: solve the normal equations AᵀAx̂ = Aᵀb.',
        'Gram–Schmidt turns a basis into an orthonormal one (QR decomposition). Orthogonal matrices preserve lengths: QᵀQ = I.',
        'Null space is orthogonal to the row space; left null space is orthogonal to the column space.',
      ]],
    ],
    exam: ['Dimension of a subspace or null space (NAT).', 'Projection of a vector or a least-squares solution.'],
    traps: ['Forgetting that a subspace must contain the zero vector.'],
  },

  eigen: {
    overview: 'Eigenvalues and eigenvectors, determinants and rank, quadratic forms and definiteness, and diagonalisation.',
    sections: [
      L.find((s) => s[0] === 'Eigenvalues and eigenvectors'),
      L.find((s) => s[0] === 'Matrices and determinants'),
      ['Quadratic forms', [
        'xᵀAx with symmetric A. Positive definite iff all eigenvalues > 0, iff all leading principal minors > 0 (Sylvester).',
        'Positive semi-definite: eigenvalues ≥ 0. Indefinite: eigenvalues of both signs (saddle).',
        'AᵀA is always positive semi-definite (positive definite if A has full column rank).',
      ]],
      ['Diagonalisation', [
        'A = PDP⁻¹ when A has n independent eigenvectors (always for distinct eigenvalues). Then Aᵏ = PDᵏP⁻¹.',
        'Real symmetric A = QΛQᵀ with orthonormal eigenvectors (spectral theorem).',
        'Algebraic multiplicity ≥ geometric multiplicity; diagonalisable iff they are equal for every eigenvalue.',
      ]],
    ],
    exam: ['Eigenvalues or determinant of a structured matrix (NAT).', 'Is a quadratic form positive definite?', 'Aⁿ via diagonalisation.'],
    traps: ['Assuming every matrix is diagonalisable (e.g. [[1, 1], [0, 1]] is not).'],
  },

  decompositions: {
    overview: 'Matrix decompositions and linear systems: LU, Gaussian elimination, and the singular value decomposition.',
    sections: [
      L.find((s) => s[0] === 'Rank and linear systems'),
      ['Gaussian elimination', [
        'Row-reduce [A | b] to echelon form; back-substitute. Cost about n³/3 multiplications for an n × n system.',
        'Partial pivoting (largest pivot in the column) improves numerical stability.',
        'Pivots of A are the diagonal of U in A = LU; det(A) = product of pivots (times ±1 for row swaps).',
      ]],
      ['Singular value decomposition', [
        'A = UΣVᵀ for any m × n matrix: U (m × m) and V (n × n) orthogonal, Σ diagonal with singular values σ₁ ≥ σ₂ ≥ … ≥ 0.',
        'σᵢ² are the eigenvalues of AᵀA (and AAᵀ). Number of non-zero singular values = rank.',
        'Best rank-k approximation (Eckart–Young): keep the k largest singular values. Basis of PCA.',
        '‖A‖₂ = σ₁; condition number = σ_max/σ_min. Pseudo-inverse A⁺ = VΣ⁺Uᵀ.',
        'For a symmetric positive semi-definite matrix, SVD and eigen-decomposition coincide.',
      ]],
    ],
    exam: ['Singular values of a small matrix (NAT).', 'LU factors or solution of a system.', 'Rank of a matrix from its SVD.'],
    traps: ['Taking eigenvalues of A as its singular values (true only for symmetric PSD matrices).'],
  },
};
