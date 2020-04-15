import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const incomeBalance = this.transactions.reduce(
      (incomeAccumulator, transaction) => {
        return transaction.type === 'income'
          ? incomeAccumulator + transaction.value
          : incomeAccumulator;
      },
      0,
    );

    const outcomeBalance = this.transactions.reduce(
      (outcomeAccumulator, transaction) => {
        return transaction.type === 'outcome'
          ? outcomeAccumulator + transaction.value
          : outcomeAccumulator;
      },
      0,
    );

    const balance = {
      income: incomeBalance,
      outcome: outcomeBalance,
      total: incomeBalance - outcomeBalance,
    };

    return balance;
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
