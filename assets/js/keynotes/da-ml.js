// Offline key notes: DA · Machine Learning. Keys are chapter ids from data.js.
export const CONTENT = {
  regression: {
    overview: 'Regression: simple and multiple linear regression by least squares, ridge regression, and the bias–variance trade-off.',
    sections: [
      ['Simple and multiple linear regression', [
        'Simple: ŷ = β₀ + β₁x; β₁ = Σ(x − x̄)(y − ȳ)/Σ(x − x̄)² = r s_y/s_x; β₀ = ȳ − β₁x̄. The line passes through (x̄, ȳ).',
        'Multiple: β̂ = (XᵀX)⁻¹Xᵀy (normal equations). Residuals are orthogonal to the columns of X.',
        'R² = 1 − SSE/SST: fraction of variance explained. Adjusted R² penalises extra predictors.',
        'Minimising squared error is maximum likelihood under Gaussian noise.',
      ]],
      ['Ridge regression', [
        'Minimise ‖y − Xβ‖² + λ‖β‖²: β̂ = (XᵀX + λI)⁻¹Xᵀy. Shrinks coefficients, never exactly to zero; always invertible for λ > 0.',
        'Lasso (L1 penalty) can set coefficients exactly to zero (feature selection).',
        'Larger λ: more bias, less variance. Standardise features before regularising.',
      ]],
      ['Bias–variance trade-off', [
        'Expected test error = bias² + variance + irreducible noise.',
        'Simple models: high bias (underfit). Complex models: high variance (overfit). Regularisation and more data reduce variance.',
      ]],
    ],
    exam: ['Fit a line to a few points and predict a value (NAT).', 'Effect of λ on ridge coefficients.'],
    traps: ['Regressing x on y gives a different line from regressing y on x.'],
  },

  classification: {
    overview: 'Classification: logistic regression, k-nearest neighbours, naive Bayes and LDA, support vector machines, and decision trees.',
    sections: [
      ['Logistic regression', [
        'P(y = 1 | x) = σ(wᵀx + b), σ(z) = 1/(1 + e^(−z)). Decision boundary wᵀx + b = 0 is linear.',
        'Trained by minimising cross-entropy (log loss), which is convex; no closed form, so gradient descent is used.',
        'Log-odds ln(p/(1 − p)) is linear in x; softmax extends it to multiple classes.',
      ]],
      ['k-nearest neighbours', [
        'Predict the majority class among the k closest training points (usually Euclidean distance). No training phase; prediction is slow.',
        'Small k: low bias, high variance (k = 1 has zero training error). Large k: smoother boundary. Scale features first.',
      ]],
      ['Naive Bayes and LDA', [
        'Naive Bayes: P(c | x) ∝ P(c) Π P(xᵢ | c), assuming features are conditionally independent given the class. Laplace smoothing avoids zero probabilities.',
        'LDA: Gaussian classes with a shared covariance give a linear boundary; separate covariances (QDA) give quadratic boundaries.',
        'Fisher’s LDA projects onto w ∝ S_w⁻¹(μ₁ − μ₂) to maximise between-class over within-class scatter.',
      ]],
      ['Support vector machines', [
        'Maximise the margin 2/‖w‖ subject to yᵢ(wᵀxᵢ + b) ≥ 1. Only support vectors (on the margin) define the boundary.',
        'Soft margin with slack and penalty C: large C → narrow margin, fewer violations (lower bias, higher variance).',
        'Kernels (polynomial, RBF) give non-linear boundaries via the kernel trick. Hinge loss max(0, 1 − y f(x)).',
      ]],
      ['Decision trees', [
        'Split on the attribute with the highest information gain (ID3) or lowest Gini impurity (CART).',
        'Entropy H = −Σpᵢ log₂ pᵢ (max 1 bit for two equal classes). Gini = 1 − Σpᵢ² (max 0.5 for two classes).',
        'Information gain = H(parent) − Σ (nⱼ/n) H(childⱼ). Gain ratio corrects the bias towards many-valued attributes.',
        'Deep trees overfit: prune, or use ensembles (bagging/random forests reduce variance; boosting reduces bias).',
      ]],
    ],
    exam: ['Entropy, Gini or information gain of a split (NAT).', 'Naive Bayes posterior for a small table.', 'k-NN prediction for a query point.'],
    traps: ['Forgetting class priors in naive Bayes.', 'Not scaling features for k-NN and SVM.'],
  },

  clustering: {
    overview: 'Unsupervised learning: k-means and k-medoids, hierarchical clustering, and PCA for dimensionality reduction.',
    sections: [
      ['k-means and k-medoids', [
        'k-means: assign points to the nearest centroid, recompute centroids as means, repeat. Minimises within-cluster sum of squares; converges to a local optimum.',
        'Sensitive to initialisation (k-means++ helps) and to outliers; finds convex, similar-sized clusters.',
        'k-medoids (PAM): centres are actual data points; robust to outliers; works with any distance.',
        'Choose k with the elbow method or silhouette score.',
      ]],
      ['Hierarchical clustering', [
        'Agglomerative (bottom-up) merges the closest clusters; divisive splits top-down. Result is a dendrogram; cut it to get k clusters.',
        'Linkage: single (minimum distance; chaining), complete (maximum distance; compact clusters), average, Ward (minimum variance increase).',
      ]],
      ['PCA and dimensionality reduction', [
        'Centre the data; principal components are eigenvectors of the covariance matrix, ordered by eigenvalue (variance explained).',
        'Fraction of variance kept by k components = Σ top-k eigenvalues / Σ all eigenvalues.',
        'Equivalent to SVD of the centred data matrix. Components are orthogonal; PCA is linear and unsupervised.',
        'Standardise features with different units before PCA.',
      ]],
    ],
    exam: ['Cluster assignments after one k-means iteration.', 'Variance explained by the first principal component (NAT).', 'Dendrogram merges under single vs complete linkage.'],
    traps: ['Forgetting to centre data before PCA.'],
  },

  nn: {
    overview: 'Neural networks: the perceptron and multilayer perceptron, activation functions, and feed-forward networks trained by backpropagation.',
    sections: [
      ['Perceptron and MLP', [
        'Perceptron: output sign(wᵀx + b); update w ← w + η(y − ŷ)x on mistakes. Converges iff the data are linearly separable.',
        'A single perceptron cannot learn XOR; one hidden layer can.',
        'Universal approximation: one hidden layer with enough units approximates any continuous function on a compact set.',
      ]],
      ['Activation functions', [
        'Sigmoid (0 to 1; σ′ = σ(1 − σ), max 0.25 → vanishing gradients), tanh (−1 to 1, zero-centred), ReLU max(0, x) (cheap, sparse; dead units), leaky ReLU.',
        'Softmax for multi-class outputs with cross-entropy loss.',
        'Without non-linear activations, stacked layers collapse to one linear map.',
      ]],
      ['Feed-forward networks and backpropagation', [
        'Forward pass computes activations; backward pass applies the chain rule layer by layer: δ⁽ˡ⁾ = (W⁽ˡ⁺¹⁾ᵀδ⁽ˡ⁺¹⁾) ⊙ f′(z⁽ˡ⁾).',
        'Gradient for weights: ∂L/∂W⁽ˡ⁾ = δ⁽ˡ⁾ a⁽ˡ⁻¹⁾ᵀ.',
        'Number of parameters of a dense layer = inputs × outputs + outputs (biases).',
        'Regularise with weight decay, dropout and early stopping.',
      ]],
    ],
    exam: ['Output of a small network for given weights (NAT).', 'Number of parameters in an MLP.', 'Perceptron weights after an update.'],
    traps: ['Forgetting bias parameters when counting weights.'],
  },

  evaluation: {
    overview: 'Model evaluation: cross-validation, precision, recall and F1, and overfitting and regularisation.',
    sections: [
      ['Leave-one-out and k-fold cross-validation', [
        'k-fold: split into k parts, train on k − 1 and test on the remaining one, rotate, and average. k = 5 or 10 is common.',
        'LOOCV: k = n; nearly unbiased but high variance and expensive (n model fits).',
        'Never tune hyperparameters on the test set; use a validation split or nested CV.',
      ]],
      ['Precision, recall and F1', [
        'Precision = TP/(TP + FP). Recall (sensitivity, TPR) = TP/(TP + FN). Specificity = TN/(TN + FP).',
        'F1 = 2PR/(P + R) (harmonic mean). Accuracy = (TP + TN)/total, misleading for imbalanced classes.',
        'ROC curve plots TPR against FPR over thresholds; AUC = 1 is perfect, 0.5 is random.',
      ]],
      ['Overfitting and regularisation', [
        'Overfitting: low training error, high validation error. Underfitting: both high.',
        'Remedies: more data, simpler models, L1/L2 regularisation, dropout, early stopping, pruning, ensembles.',
        'Learning curves show whether more data will help (high variance) or not (high bias).',
      ]],
    ],
    exam: ['Precision, recall or F1 from a confusion matrix (NAT).', 'Number of model fits for k-fold or LOOCV.'],
    traps: ['Reporting accuracy for a heavily imbalanced dataset.'],
  },
};
