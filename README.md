# Budget-Beam

[Live Demo](https://budget-beam-green.vercel.app/sign-in?redirect_url=https%3A%2F%2Fbudget-beam-green.vercel.app%2F)

Budget-Beam is a comprehensive financial management application designed to help users track their budgets and expenses efficiently. With intuitive features for creating, editing, and deleting budget items, users can easily manage their financial activities. The application includes detailed reporting capabilities, allowing users to generate and download financial reports in PDF format.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)
- [Acknowledgments](#acknowledgments)

## Features

- **Budget Management**: 📊 Create, edit, and delete budget items with ease.
- **Expense Tracking**: 💸 Add and update expenses associated with each budget item.
- **Detailed Reporting**: 📈 Generate comprehensive financial reports, including budget performance, expense analysis, income trends, and savings growth.
- **User-Friendly Interface**: 🖥️ A clean and intuitive user interface for seamless navigation and management.
- **PDF Export**: 📄 Download financial reports in PDF format for easy sharing and record-keeping.

## Installation

### Prerequisites

- Node.js (v14 or later)
- npm (v6 or later)
- Git

### Steps

1. **Clone the Repository**:

    ```sh
    git clone https://github.com/Dilesh-Bisen/Budget-Beam.git
    cd Budget-Beam
    ```

2. **Install Dependencies**:

    ```sh
    npm install
    ```

3. **Set Up Environment Variables**:

    Create a `.env` file in the root directory and add the necessary environment variables:

    ```env
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_publishable_key
    CLERK_SECRET_KEY=your_secret_key

    NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
    NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

    NEXT_PUBLIC_DATABASE_URL=your_database_url
    ```

4. **Run the Development Server**:

    ```sh
    npm run dev
    ```

5. **Build the Project**:

    ```sh
    npm run build
    ```

6. **Start the Production Server**:

    ```sh
    npm start
    ```

## Usage

### Creating a Budget

1. Navigate to the home page.
2. Click on the "Create New Budget" button.
3. Fill in the budget details such as name, amount, and icon.
4. Click on the "Create Budget" button.

### Adding an Expense

1. Navigate to the budget item you want to add an expense to.
2. Click on the budget item to open the details page.
3. Fill in the expense details such as name, amount, and tags.
4. Click on the "Add Expense" button.

### Generating Reports

1. Navigate to the "Reports" page.
2. Click on the "Download Reports" button to generate and download the financial reports in PDF format.

## Contributing

Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a Pull Request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.

## Contact

For any questions or issues, please open an issue on the GitHub repository or contact the project maintainer at [2dileshbisen@gmail.com].

## Acknowledgments

This project was designed and developed by Dilesh Bisen.

---

**Happy Budgeting!** 🎉
