import { BudgetRepo } from "./budgetRepo";

const dayjs = require('dayjs')

export class BudgetService {
  monthMap = {}
  budget = 0

  constructor() {
    this.budgetRepo = new BudgetRepo();
  }

  getDayOfMonth(_budget, format) {
    return dayjs(_budget.YearMonth, format).daysInMonth();
  }

  queryDB() {
    return this.budgetRepo.getAll();
  }

  query(start, end) {
    const allBudget = this.queryDB();

    allBudget.forEach((_budget) => {
      const budgetFor1Day = _budget.Amount / this.getDayOfMonth(_budget, 'YYYYMM')
      this.monthMap[_budget.YearMonth] = budgetFor1Day
    })

    let loop = new Date(start)
    while (loop <= new Date(end)) {
      let curr = dayjs(loop).format('YYYYMM')
      const budget = this.monthMap[curr] || 0
      this.budget += budget
      loop = dayjs(loop).add(1, 'd')
    }
    return this.budget
  }


}
