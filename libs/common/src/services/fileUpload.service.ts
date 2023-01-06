import { FileUploadService as FileUploadServiceAbstraction } from "../abstractions/fileUpload.service";
import { LogService } from "../abstractions/log.service";
import { FileUploadType } from "../enums/fileUploadType";
import { EncArrayBuffer } from "../models/domain/enc-array-buffer";
import { EncString } from "../models/domain/enc-string";
import { AttachmentUploadDataResponse } from "../models/response/attachment-upload-data.response";
import { SendFileUploadDataResponse } from "../models/response/send-file-upload-data.response";
import { FileUploadApiMethods } from "../types/fileUploadApiMethods";

import { AzureFileUploadService } from "./azureFileUpload.service";
import { BitwardenFileUploadService } from "./bitwardenFileUpload.service";

export abstract class FileUploadService implements FileUploadServiceAbstraction {
  private azureFileUploadService: AzureFileUploadService;
  private bitwardenFileUploadService: BitwardenFileUploadService;

  constructor(protected logService: LogService) {
    this.azureFileUploadService = new AzureFileUploadService(logService);
    this.bitwardenFileUploadService = new BitwardenFileUploadService();
  }

  abstract post(
    uploadData: SendFileUploadDataResponse | AttachmentUploadDataResponse,
    data: FormData,
    fileUploadMethods: FileUploadApiMethods
  ): Promise<any>;

  abstract rollback(
    uploadData: SendFileUploadDataResponse | AttachmentUploadDataResponse,
    fileUploadMethods: FileUploadApiMethods
  ): Promise<any>;

  abstract renew(
    uploadData: SendFileUploadDataResponse | AttachmentUploadDataResponse,
    fileUploadMethods: FileUploadApiMethods
  ): Promise<SendFileUploadDataResponse | AttachmentUploadDataResponse>;

  async upload(
    uploadData: SendFileUploadDataResponse | AttachmentUploadDataResponse,
    fileName: EncString,
    encryptedFileData: EncArrayBuffer,
    fileUploadMethods: FileUploadApiMethods
  ) {
    try {
      switch (uploadData.fileUploadType) {
        case FileUploadType.Direct:
          await this.bitwardenFileUploadService.upload(
            fileName.encryptedString,
            encryptedFileData,
            (fd) => this.post(uploadData, fd, fileUploadMethods)
          );
          break;
        case FileUploadType.Azure: {
          const renewalCallback = async () => {
            const r = await this.renew(uploadData, fileUploadMethods);
            return r.url;
          };
          await this.azureFileUploadService.upload(
            uploadData.url,
            encryptedFileData,
            renewalCallback
          );
          break;
        }
        default:
          throw new Error("Unknown file upload type");
      }
    } catch (e) {
      await this.rollback(uploadData, fileUploadMethods);
      throw e;
    }
  }

  // async uploadCipherAttachment(
  //   admin: boolean,
  //   uploadData: AttachmentUploadDataResponse,
  //   encryptedFileName: EncString,
  //   encryptedFileData: EncArrayBuffer
  // ) {
  //   const response = admin ? uploadData.cipherMiniResponse : uploadData.cipherResponse;
  //   try {
  //     switch (uploadData.fileUploadType) {
  //       case FileUploadType.Direct:
  //         await this.bitwardenFileUploadService.upload(
  //           encryptedFileName.encryptedString,
  //           encryptedFileData,
  //           (fd) => this.apiService.postAttachmentFile(response.id, uploadData.attachmentId, fd)
  //         );
  //         break;
  //       case FileUploadType.Azure: {
  //         const renewalCallback = async () => {
  //           const renewalResponse = await this.apiService.renewAttachmentUploadUrl(
  //             response.id,
  //             uploadData.attachmentId
  //           );
  //           return renewalResponse.url;
  //         };
  //         await this.azureFileUploadService.upload(
  //           uploadData.url,
  //           encryptedFileData,
  //           renewalCallback
  //         );
  //         break;
  //       }
  //       default:
  //         throw new Error("Unknown file upload type.");
  //     }
  //   } catch (e) {
  //     if (admin) {
  //       await this.apiService.deleteCipherAttachmentAdmin(response.id, uploadData.attachmentId);
  //     } else {
  //       await this.apiService.deleteCipherAttachment(response.id, uploadData.attachmentId);
  //     }
  //     throw e;
  //   }
  // }
}
