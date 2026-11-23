// Offline key notes: DA · Database Management & Warehousing. Builds on the CS databases notes. Keys are chapter ids.
import { CONTENT as DB } from './cs-db.js';

export const CONTENT = {
  sql: {
    overview: 'ER model, relational model and algebra, and SQL queries.',
    sections: [...DB.er.sections, ...DB.sql.sections],
    exam: [...DB.er.exam, ...DB.sql.exam],
    traps: [...DB.er.traps, ...DB.sql.traps],
  },

  normalisation: {
    overview: 'Functional dependencies, normal forms and decomposition, plus indexing and tree indexes.',
    sections: [...DB.normalisation.sections, ...DB.indexing.sections],
    formulas: DB.normalisation.formulas,
    exam: [...DB.normalisation.exam, ...DB.indexing.exam.slice(0, 1)],
    traps: [...DB.normalisation.traps, ...DB.indexing.traps],
  },

  warehousing: {
    overview: 'Data warehousing: data transformation (normalisation, discretisation, sampling), the multidimensional model, star and snowflake schemas, and OLAP operations.',
    sections: [
      ['Data transformation', [
        '**Normalisation (scaling):** min–max x′ = (x − min)/(max − min) to [0, 1]; z-score x′ = (x − μ)/σ; decimal scaling.',
        '**Discretisation:** equal-width or equal-frequency binning; supervised (entropy-based) splitting; concept hierarchies.',
        '**Sampling:** simple random (with/without replacement), stratified (keeps class proportions), cluster sampling.',
        'Other preprocessing: cleaning (missing values, noise), integration, reduction (PCA, aggregation).',
      ]],
      ['Multidimensional data model', [
        'Data cube: dimensions (time, product, location) and measures (sales).',
        'An n-dimensional cube has 2ⁿ cuboids (group-by combinations) without hierarchies; with Lᵢ levels per dimension, Π(Lᵢ + 1).',
        'Measures: distributive (sum, count), algebraic (average), holistic (median).',
        'OLTP: current, detailed, many short updates. OLAP / warehouse: historical, integrated, subject-oriented, non-volatile, read-mostly.',
      ]],
      ['Star and snowflake schemas', [
        'Star: one central fact table (foreign keys + measures) joined to denormalised dimension tables. Fewer joins, faster queries.',
        'Snowflake: dimension tables normalised into sub-tables; less redundancy, more joins.',
        'Fact constellation (galaxy): several fact tables share dimensions.',
      ]],
      ['OLAP operations', [
        '**Roll-up:** aggregate up a hierarchy (city → country) or drop a dimension. **Drill-down:** the reverse.',
        '**Slice:** fix one dimension to a value (a sub-cube with one fewer dimension). **Dice:** select ranges on several dimensions.',
        '**Pivot:** rotate the axes for a different view.',
        'MOLAP (array storage), ROLAP (relational), HOLAP (hybrid).',
      ]],
    ],
    exam: ['Number of cuboids in a data cube (NAT).', 'Which OLAP operation does a query perform?', 'Min–max or z-score normalised value.'],
    traps: ['Confusing slice (one dimension fixed) with dice (ranges on several).'],
  },
};
