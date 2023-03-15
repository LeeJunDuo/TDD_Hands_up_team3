import { BudgetRepo } from "./budgetRepo";

const dayjs = require('dayjs')

export class BudgetService {
  monthMap = {}
  budget = 0

  query(start, end) {
    let budgetRepo = new BudgetRepo();
    const allBudget = budgetRepo.getAll();

    function getDayOfMonth(_budget, format) {
      return dayjs(_budget.YearMonth, format).daysInMonth();
    }

    allBudget.forEach((_budget) => {
      const budgetFor1Day = _budget.Amount / getDayOfMonth(_budget, 'YYYYMM')
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