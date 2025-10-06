import type { Schema, Struct } from '@strapi/strapi';

export interface EvaluationDimension extends Struct.ComponentSchema {
  collectionName: 'components_evaluation_dimensions';
  info: {
    description: '';
    displayName: 'Dimension';
  };
  attributes: {
    comment: Schema.Attribute.Text & Schema.Attribute.Required;
    quiz: Schema.Attribute.Component<'evaluation.question', true>;
  };
}

export interface EvaluationQuestion extends Struct.ComponentSchema {
  collectionName: 'components_evaluation_questions';
  info: {
    description: '';
    displayName: 'Question';
  };
  attributes: {
    answer: Schema.Attribute.Integer &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMax<
        {
          max: 4;
          min: 0;
        },
        number
      >;
  };
}

export interface MatrixDimension extends Struct.ComponentSchema {
  collectionName: 'components_matrix_dimensions';
  info: {
    description: '';
    displayName: 'dimension';
  };
  attributes: {
    link: Schema.Attribute.String;
    name: Schema.Attribute.String;
  };
}

export interface MatrixQuestion extends Struct.ComponentSchema {
  collectionName: 'components_matrix_questions';
  info: {
    description: '';
    displayName: 'question';
  };
  attributes: {
    option_1: Schema.Attribute.Text;
    option_2: Schema.Attribute.Text;
    option_3: Schema.Attribute.Text;
    option_4: Schema.Attribute.Text;
    option_5: Schema.Attribute.Text;
    question: Schema.Attribute.String;
    tag: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'evaluation.dimension': EvaluationDimension;
      'evaluation.question': EvaluationQuestion;
      'matrix.dimension': MatrixDimension;
      'matrix.question': MatrixQuestion;
    }
  }
}
