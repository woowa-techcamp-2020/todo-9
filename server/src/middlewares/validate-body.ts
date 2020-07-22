import { NextFunction, Request, Response } from 'express'

// export const validateBody = (attrs: (keyof UserInfo)[]) => (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   const validatedResult = attrs.reduce(
//     (results, key) => {
//       const { validator, error: err } = Validator[key]
//       const isValidInput = validator(req.body[key])
//       if (!isValidInput) {
//         results.err = {}
//         results.err[key] = err
//       }
//       return results
//     },
//     { err: null }
//   )

//   const numberOfInvalidInput =
//     validatedResult.err === null ? 0 : Object.keys(validatedResult.err).length

//   if (numberOfInvalidInput !== 0) {
//     return res.send(validatedResult)
//   }

//   next()
// }
