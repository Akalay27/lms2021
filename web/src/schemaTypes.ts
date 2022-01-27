/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: CheckoutQuery
// ====================================================

export interface CheckoutQuery_stripe_session {
  __typename: "User";
  stripe_session_id: string;
}

export interface CheckoutQuery {
  stripe_session: CheckoutQuery_stripe_session | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: FulfillQuery
// ====================================================

export interface FulfillQuery {
  fulfill_payment: boolean;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetCodeEntryQuery
// ====================================================

export interface GetCodeEntryQuery_get_code_entry {
  __typename: "CodeEntry";
  code: string | null;
  date_changed: string | null;
  exercise_uid: number;
  user: number;
  status: string;
}

export interface GetCodeEntryQuery {
  get_code_entry: GetCodeEntryQuery_get_code_entry;
}

export interface GetCodeEntryQueryVariables {
  uid?: number | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: SaveCodeEntryMutation
// ====================================================

export interface SaveCodeEntryMutation {
  save_code_entry: boolean;
}

export interface SaveCodeEntryMutationVariables {
  exercise_uid: number;
  code: string;
  status?: string | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetExerciseQuery
// ====================================================

export interface GetExerciseQuery_get_exercise {
  __typename: "Exercise";
  uid: string;
  title: string | null;
  article: string | null;
  id: number | null;
}

export interface GetExerciseQuery {
  get_exercise: GetExerciseQuery_get_exercise | null;
}

export interface GetExerciseQueryVariables {
  uid?: number | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetAllExercisesQuery
// ====================================================

export interface GetAllExercisesQuery_get_all_exercises {
  __typename: "Exercise";
  uid: string;
  id: number | null;
  title: string | null;
  status: string | null;
}

export interface GetAllExercisesQuery {
  get_all_exercises: (GetAllExercisesQuery_get_all_exercises | null)[] | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: FullRegisterMutation
// ====================================================

export interface FullRegisterMutation_register_full {
  __typename: "User";
  id: string;
  email: string;
}

export interface FullRegisterMutation {
  register_full: FullRegisterMutation_register_full | null;
}

export interface FullRegisterMutationVariables {
  email: string;
  username: string;
  password: string;
  parent_first_name: string;
  parent_last_name: string;
  child_first_name: string;
  child_last_name: string;
  child_grade: string;
  signup_date: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: DatesQuery
// ====================================================

export interface DatesQuery_dates {
  __typename: "Week";
  date: string;
  capacity: number;
  students: number;
}

export interface DatesQuery {
  dates: (DatesQuery_dates | null)[] | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: LoginMutation
// ====================================================

export interface LoginMutation_login {
  __typename: "User";
  id: string;
  email: string;
}

export interface LoginMutation {
  login: LoginMutation_login | null;
}

export interface LoginMutationVariables {
  email: string;
  password: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: LogoutMutation
// ====================================================

export interface LogoutMutation {
  logout: boolean;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: MeQuery
// ====================================================

export interface MeQuery_me {
  __typename: "User";
  id: string;
  email: string;
  type: string;
  parent_first_name: string;
}

export interface MeQuery {
  me: MeQuery_me | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ReferralQuery
// ====================================================

export interface ReferralQuery {
  referral: boolean;
}

export interface ReferralQueryVariables {
  referral_code?: string | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: RegisterMutation
// ====================================================

export interface RegisterMutation {
  register: boolean;
}

export interface RegisterMutationVariables {
  email: string;
  password: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

//==============================================================
// END Enums and Input Objects
//==============================================================
