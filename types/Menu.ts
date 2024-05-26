
// Define the base interface for nested children
export interface IChild {
  title: string;
  type: string;
  path?: string;
  megaMenu?: boolean;
  children?: IChild[]; // Recursively defined
}

// Define the interface for Mongoose document, separating recursive relationships
// export interface IChildDocument extends Document {
//   title: string;
//   type: string;
//   path?: string;
//   megaMenu?: boolean;
//   children?: IChildDocument[]; // Use IChildDocument here for recursion
// }

// Main menu interface
export interface IMenu {
  title: string;
  type: string;
  megaMenu?: boolean;
  children?: IChild[]; // Nested children
}

// Interface for Mongoose document with embedded sub-documents
// export interface IMenuDocument extends Document {
//   title: string;
//   type: string;
//   megaMenu?: boolean;
//   children?: IChildDocument[]; // Reference the correct document interface
// }