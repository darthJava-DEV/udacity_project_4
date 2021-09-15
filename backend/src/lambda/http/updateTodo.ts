import 'source-map-support/register'

import {APIGatewayProxyEvent, APIGatewayProxyResult} from 'aws-lambda'
import * as middy from 'middy'
import {cors, httpErrorHandler} from 'middy/middlewares'
import {UpdateTodoRequest} from '../../requests/UpdateTodoRequest'
import {
    decodeJWTFromAPIGatewayEvent,
    parseUserId
} from "../../../../../solution/Serverless-Todo-App/backend/src/auth/utils";
import {updateTodo} from "../../helpers/todos";

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
      const todoId = event.pathParameters.todoId
      const updatedTodo: UpdateTodoRequest = JSON.parse(event.body)
      // TODO: Update a TODO item with the provided id using values in the "updatedTodo" object - DONE

      const jwtToken = decodeJWTFromAPIGatewayEvent(event);
      const userId = parseUserId(jwtToken);

      await updateTodo(todoId, updatedTodo, userId);

      return {
          statusCode: 200,
          body: JSON.stringify(true),
      };
  }
)

handler.use(httpErrorHandler()).use(cors({credentials: true})).use(httpErrorHandler());
