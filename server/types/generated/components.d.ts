import type { Schema, Attribute } from '@strapi/strapi';

export interface EvaluationDimension extends Schema.Component {
  collectionName: 'components_evaluation_dimensions';
  info: {
    displayName: 'Dimension';
    description: '';
  };
  attributes: {
    quiz: Attribute.Component<'evaluation.question', true>;
    comment: Attribute.Text & Attribute.Required;
  };
}

export interface EvaluationQuestion extends Schema.Component {
  collectionName: 'components_evaluation_questions';
  info: {
    displayName: 'Question';
    description: '';
  };
  attributes: {
    answer: Attribute.Integer &
      Attribute.Required &
      Attribute.SetMinMax<{
        min: 0;
        max: 4;
      }>;
  };
}

export interface MatrixDimension extends Schema.Component {
  collectionName: 'components_matrix_dimensions';
  info: {
    displayName: 'dimension';
    description: '';
  };
  attributes: {
    name: Attribute.String;
    link: Attribute.String;
  };
}

export interface MatrixQuestion extends Schema.Component {
  collectionName: 'components_matrix_questions';
  info: {
    displayName: 'question';
    description: '';
  };
  attributes: {
    question: Attribute.String;
    option_1: Attribute.Text;
    option_2: Attribute.Text;
    option_3: Attribute.Text;
    option_4: Attribute.Text;
    option_5: Attribute.Text;
    tag: Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Shared {
    export interface Components {
      'evaluation.dimension': EvaluationDimension;
      'evaluation.question': EvaluationQuestion;
      'matrix.dimension': MatrixDimension;
      'matrix.question': MatrixQuestion;
    }
  }
}
