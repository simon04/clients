import { ApiService } from "../../abstractions/api.service";
import { SendApiService as SendApiServiceAbstraction } from "../../abstractions/send/send-api.service.abstraction";
import { Utils } from "../../misc/utils";
import { EncArrayBuffer } from "../../models/domain/enc-array-buffer";
import { Send } from "../../models/domain/send";
import { SendAccessRequest } from "../../models/request/send-access.request";
import { SendRequest } from "../../models/request/send.request";
import { ListResponse } from "../../models/response/list.response";
import { SendAccessResponse } from "../../models/response/send-access.response";
import { SendFileDownloadDataResponse } from "../../models/response/send-file-download-data.response";
import { SendFileUploadDataResponse } from "../../models/response/send-file-upload-data.response";
import { SendResponse } from "../../models/response/send.response";
import { SendAccessView } from "../../models/view/send-access.view";

export class SendApiService implements SendApiServiceAbstraction {
  constructor(private apiService: ApiService) {}
  async getSend(id: string): Promise<SendResponse> {
    const r = await this.apiService.send("GET", "/sends/" + id, null, true, true);
    return new SendResponse(r);
  }

  async postSendAccess(
    id: string,
    request: SendAccessRequest,
    apiUrl?: string
  ): Promise<SendAccessResponse> {
    const addSendIdHeader = (headers: Headers) => {
      headers.set("Send-Id", id);
    };
    const r = await this.apiService.send(
      "POST",
      "/sends/access/" + id,
      request,
      false,
      true,
      apiUrl,
      addSendIdHeader
    );
    return new SendAccessResponse(r);
  }

  async getSendFileDownloadData(
    send: SendAccessView,
    request: SendAccessRequest,
    apiUrl?: string
  ): Promise<SendFileDownloadDataResponse> {
    const addSendIdHeader = (headers: Headers) => {
      headers.set("Send-Id", send.id);
    };
    const r = await this.apiService.send(
      "POST",
      "/sends/" + send.id + "/access/file/" + send.file.id,
      request,
      false,
      true,
      apiUrl,
      addSendIdHeader
    );
    return new SendFileDownloadDataResponse(r);
  }

  async getSends(): Promise<ListResponse<SendResponse>> {
    const r = await this.apiService.send("GET", "/sends", null, true, true);
    return new ListResponse(r, SendResponse);
  }

  async postSend(request: SendRequest): Promise<SendResponse> {
    const r = await this.apiService.send("POST", "/sends", request, true, true);
    return new SendResponse(r);
  }

  async postFileTypeSend(request: SendRequest): Promise<SendFileUploadDataResponse> {
    const r = await this.apiService.send("POST", "/sends/file/v2", request, true, true);
    return new SendFileUploadDataResponse(r);
  }

  async renewSendFileUploadUrl(
    sendId: string,
    fileId: string
  ): Promise<SendFileUploadDataResponse> {
    const r = await this.apiService.send(
      "GET",
      "/sends/" + sendId + "/file/" + fileId,
      null,
      true,
      true
    );
    return new SendFileUploadDataResponse(r);
  }

  postSendFile(sendId: string, fileId: string, data: FormData): Promise<any> {
    return this.apiService.send("POST", "/sends/" + sendId + "/file/" + fileId, data, true, false);
  }

  /**
   * @deprecated Mar 25 2021: This method has been deprecated in favor of direct uploads.
   * This method still exists for backward compatibility with old server versions.
   */
  async postSendFileLegacy(data: FormData): Promise<SendResponse> {
    const r = await this.apiService.send("POST", "/sends/file", data, true, true);
    return new SendResponse(r);
  }

  async putSend(id: string, request: SendRequest): Promise<SendResponse> {
    const r = await this.apiService.send("PUT", "/sends/" + id, request, true, true);
    return new SendResponse(r);
  }

  async putSendRemovePassword(id: string): Promise<SendResponse> {
    const r = await this.apiService.send(
      "PUT",
      "/sends/" + id + "/remove-password",
      null,
      true,
      true
    );
    return new SendResponse(r);
  }

  deleteSend(id: string): Promise<any> {
    return this.apiService.send("DELETE", "/sends/" + id, null, true, false);
  }

  /**
   * @deprecated Mar 25 2021: This method has been deprecated in favor of direct uploads.
   * This method still exists for backward compatibility with old server versions.
   */
  async legacyServerSendFileUpload(
    sendData: [Send, EncArrayBuffer],
    request: SendRequest
  ): Promise<SendResponse> {
    const fd = new FormData();
    try {
      const blob = new Blob([sendData[1].buffer], { type: "application/octet-stream" });
      fd.append("model", JSON.stringify(request));
      fd.append("data", blob, sendData[0].file.fileName.encryptedString);
    } catch (e) {
      if (Utils.isNode && !Utils.isBrowser) {
        fd.append("model", JSON.stringify(request));
        fd.append(
          "data",
          Buffer.from(sendData[1].buffer) as any,
          {
            filepath: sendData[0].file.fileName.encryptedString,
            contentType: "application/octet-stream",
          } as any
        );
      } else {
        throw e;
      }
    }
    return await this.postSendFileLegacy(fd);
  }
}
