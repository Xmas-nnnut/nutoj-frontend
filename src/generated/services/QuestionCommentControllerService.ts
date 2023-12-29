/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseResponse_boolean_ } from '../models/BaseResponse_boolean_';
import type { BaseResponse_long_ } from '../models/BaseResponse_long_';
import type { BaseResponse_Page_QuestionCommentVO_ } from '../models/BaseResponse_Page_QuestionCommentVO_';
import type { BaseResponse_QuestionCommentVO_ } from '../models/BaseResponse_QuestionCommentVO_';
import type { DeleteRequest } from '../models/DeleteRequest';
import type { QuestionCommentAddRequest } from '../models/QuestionCommentAddRequest';
import type { QuestionCommentEditRequest } from '../models/QuestionCommentEditRequest';
import type { QuestionCommentQueryRequest } from '../models/QuestionCommentQueryRequest';
import type { QuestionCommentUpdateRequest } from '../models/QuestionCommentUpdateRequest';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class QuestionCommentControllerService {

    /**
     * addQuestionComment
     * @param questionCommentAddRequest questionCommentAddRequest
     * @returns BaseResponse_long_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static addQuestionCommentUsingPost(
        questionCommentAddRequest: QuestionCommentAddRequest,
    ): CancelablePromise<BaseResponse_long_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/question_comment/add',
            body: questionCommentAddRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * deleteQuestionComment
     * @param deleteRequest deleteRequest
     * @returns BaseResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static deleteQuestionCommentUsingPost(
        deleteRequest: DeleteRequest,
    ): CancelablePromise<BaseResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/question_comment/delete',
            body: deleteRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * editQuestionComment
     * @param questionCommentEditRequest questionCommentEditRequest
     * @returns BaseResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static editQuestionCommentUsingPost(
        questionCommentEditRequest: QuestionCommentEditRequest,
    ): CancelablePromise<BaseResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/question_comment/edit',
            body: questionCommentEditRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * getQuestionCommentVOById
     * @param id id
     * @returns BaseResponse_QuestionCommentVO_ OK
     * @throws ApiError
     */
    public static getQuestionCommentVoByIdUsingGet(
        id?: number,
    ): CancelablePromise<BaseResponse_QuestionCommentVO_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/question_comment/get/vo',
            query: {
                'id': id,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * listQuestionCommentVOByPage
     * @param questionCommentQueryRequest questionCommentQueryRequest
     * @returns BaseResponse_Page_QuestionCommentVO_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static listQuestionCommentVoByPageUsingPost(
        questionCommentQueryRequest: QuestionCommentQueryRequest,
    ): CancelablePromise<BaseResponse_Page_QuestionCommentVO_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/question_comment/list/page/vo',
            body: questionCommentQueryRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * listMyQuestionCommentVOByPage
     * @param questionCommentQueryRequest questionCommentQueryRequest
     * @returns BaseResponse_Page_QuestionCommentVO_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static listMyQuestionCommentVoByPageUsingPost(
        questionCommentQueryRequest: QuestionCommentQueryRequest,
    ): CancelablePromise<BaseResponse_Page_QuestionCommentVO_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/question_comment/my/list/page/vo',
            body: questionCommentQueryRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * listIdQuestionCommentVOByPage
     * @param questionCommentQueryRequest questionCommentQueryRequest
     * @returns BaseResponse_Page_QuestionCommentVO_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static listIdQuestionCommentVoByPageUsingPost(
        questionCommentQueryRequest: QuestionCommentQueryRequest,
    ): CancelablePromise<BaseResponse_Page_QuestionCommentVO_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/question_comment/questionId/list/page/vo',
            body: questionCommentQueryRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * updateQuestionComment
     * @param questionCommentUpdateRequest questionCommentUpdateRequest
     * @returns BaseResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static updateQuestionCommentUsingPost(
        questionCommentUpdateRequest: QuestionCommentUpdateRequest,
    ): CancelablePromise<BaseResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/question_comment/update',
            body: questionCommentUpdateRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

}
