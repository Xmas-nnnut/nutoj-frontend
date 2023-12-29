/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseResponse_Page_RecordVO_ } from '../models/BaseResponse_Page_RecordVO_';
import type { BaseResponse_RecordVO_ } from '../models/BaseResponse_RecordVO_';
import type { RecordQueryRequest } from '../models/RecordQueryRequest';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class RecordControllerService {

    /**
     * getRecordVOById
     * @param id id
     * @returns BaseResponse_RecordVO_ OK
     * @throws ApiError
     */
    public static getRecordVoByIdUsingGet(
        id?: number,
    ): CancelablePromise<BaseResponse_RecordVO_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/record/get/vo',
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
     * listRecordVOByPage
     * @param recordQueryRequest recordQueryRequest
     * @returns BaseResponse_Page_RecordVO_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static listRecordVoByPageUsingPost(
        recordQueryRequest: RecordQueryRequest,
    ): CancelablePromise<BaseResponse_Page_RecordVO_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/record/list/page/vo',
            body: recordQueryRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * listMyRecordVOByPage
     * @param recordQueryRequest recordQueryRequest
     * @returns BaseResponse_Page_RecordVO_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static listMyRecordVoByPageUsingPost(
        recordQueryRequest: RecordQueryRequest,
    ): CancelablePromise<BaseResponse_Page_RecordVO_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/record/my/list/page/vo',
            body: recordQueryRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

}
