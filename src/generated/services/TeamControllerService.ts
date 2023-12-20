/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseResponse_boolean_ } from '../models/BaseResponse_boolean_';
import type { BaseResponse_List_TeamUserVO_ } from '../models/BaseResponse_List_TeamUserVO_';
import type { BaseResponse_List_UserVO_ } from '../models/BaseResponse_List_UserVO_';
import type { BaseResponse_long_ } from '../models/BaseResponse_long_';
import type { BaseResponse_Page_Team_ } from '../models/BaseResponse_Page_Team_';
import type { BaseResponse_Team_ } from '../models/BaseResponse_Team_';
import type { DeleteRequest } from '../models/DeleteRequest';
import type { TeamAddRequest } from '../models/TeamAddRequest';
import type { TeamJoinRequest } from '../models/TeamJoinRequest';
import type { TeamQueryRequest } from '../models/TeamQueryRequest';
import type { TeamQuitRequest } from '../models/TeamQuitRequest';
import type { TeamUpdateRequest } from '../models/TeamUpdateRequest';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class TeamControllerService {

    /**
     * addTeam
     * @param teamAddRequest teamAddRequest
     * @returns BaseResponse_long_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static addTeamUsingPost(
        teamAddRequest: TeamAddRequest,
    ): CancelablePromise<BaseResponse_long_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/team/add',
            body: teamAddRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * deleteTeam
     * @param deleteRequest deleteRequest
     * @returns BaseResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static deleteTeamUsingPost(
        deleteRequest: DeleteRequest,
    ): CancelablePromise<BaseResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/team/delete',
            body: deleteRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * getTeamById
     * @param id id
     * @returns BaseResponse_Team_ OK
     * @throws ApiError
     */
    public static getTeamByIdUsingGet(
        id?: number,
    ): CancelablePromise<BaseResponse_Team_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/team/get',
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
     * getTeamIncludeUser
     * @param teamId teamId
     * @returns BaseResponse_List_UserVO_ OK
     * @throws ApiError
     */
    public static getTeamIncludeUserUsingGet(
        teamId?: number,
    ): CancelablePromise<BaseResponse_List_UserVO_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/team/include/user',
            query: {
                'teamId': teamId,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * joinTeam
     * @param teamJoinRequest teamJoinRequest
     * @returns BaseResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static joinTeamUsingPost(
        teamJoinRequest: TeamJoinRequest,
    ): CancelablePromise<BaseResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/team/join',
            body: teamJoinRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * listTeams
     * @param teamQueryRequest teamQueryRequest
     * @returns BaseResponse_List_TeamUserVO_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static listTeamsUsingPost(
        teamQueryRequest: TeamQueryRequest,
    ): CancelablePromise<BaseResponse_List_TeamUserVO_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/team/list',
            body: teamQueryRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * listMyCreateTeams
     * @param teamQueryRequest teamQueryRequest
     * @returns BaseResponse_List_TeamUserVO_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static listMyCreateTeamsUsingPost(
        teamQueryRequest: TeamQueryRequest,
    ): CancelablePromise<BaseResponse_List_TeamUserVO_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/team/list/my/create',
            body: teamQueryRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * listMyJoinTeams
     * @param teamQueryRequest teamQueryRequest
     * @returns BaseResponse_List_TeamUserVO_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static listMyJoinTeamsUsingPost(
        teamQueryRequest: TeamQueryRequest,
    ): CancelablePromise<BaseResponse_List_TeamUserVO_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/team/list/my/join',
            body: teamQueryRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * listTeamsByPage
     * @param teamQueryRequest teamQueryRequest
     * @returns BaseResponse_Page_Team_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static listTeamsByPageUsingPost(
        teamQueryRequest: TeamQueryRequest,
    ): CancelablePromise<BaseResponse_Page_Team_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/team/list/page',
            body: teamQueryRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * quitTeam
     * @param teamQuitRequest teamQuitRequest
     * @returns BaseResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static quitTeamUsingPost(
        teamQuitRequest: TeamQuitRequest,
    ): CancelablePromise<BaseResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/team/quit',
            body: teamQuitRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * updateTeam
     * @param teamUpdateRequest teamUpdateRequest
     * @returns BaseResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static updateTeamUsingPost(
        teamUpdateRequest: TeamUpdateRequest,
    ): CancelablePromise<BaseResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/team/update',
            body: teamUpdateRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

}
