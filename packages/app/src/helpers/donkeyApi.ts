import axios, { AxiosError, AxiosResponse } from 'axios';
/**
 * @class DonkeyApi
 * @description Create a new instance of an API path with return type T
 * @param {string} path path of the API
 * @type return type of the API methods
 */
export class DonkeyApi<T> {
  constructor(readonly path: string, readonly token: string) {}
  private readonly AxiosApi = axios.create({
    baseURL: process.env.APP_API,
    headers: {
      Authorization: `Bearer ${this.token}`,
    },
  });
  /**
   * @method getAll
   * @description get a list of all data of entity type T
   */
  public async getAll(): Promise<T[]> {
    return new Promise((resolve, reject) => {
      this.AxiosApi({
        url: this.path,
        method: 'get',
      })
        .then((res: AxiosResponse<T[]>) => resolve(res.data))
        .catch((err: AxiosError) => reject(err));
    });
  }
  /**
   * @method getById
   * @description get specific entity by id
   * @param {string} id - ID of the entity
   *
   */
  public async getById(id: string): Promise<T> {
    return new Promise((resolve, reject) => {
      this.AxiosApi({
        url: `${this.path}${id}/`,
        method: 'get',
      })
        .then((res: AxiosResponse<T>) => resolve(res.data))
        .catch((err: AxiosError) => reject(err));
    });
  }

  /**
   * createEntity
   * @description create a new entity
   * @param {T} data entity data
   */
  public async createEntity(data: T): Promise<T> {
    return new Promise((resolve, reject) => {
      this.AxiosApi({
        url: this.path,
        method: 'post',
        data: { ...data },
      })
        .then((res: AxiosResponse<T>) => resolve(res.data))
        .catch((err: AxiosError) => reject(err));
    });
  }
  /**
   * @method updateEntity
   * @description update specific entity by id
   * @param {string} id - ID of the entity
   * @param {T} data entity data to be updated
   */
  public async updateEntity(data: T, id: string | undefined): Promise<T> {
    return new Promise((resolve, reject) => {
      this.AxiosApi({
        url: `${this.path}${id}/`,
        data: {
          ...data,
        },
        method: 'put',
      })
        .then((res: AxiosResponse<T>) => resolve(res.data))
        .catch((err: AxiosError) => reject(err));
    });
  }

  /**
   * @name removeEntity
   * @description remove an entity by ID
   * @param {string} id id of the entity
   */
  public async removeEntity(id: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.AxiosApi({
        url: `${this.path}${id}/`,
        method: 'delete',
      })
        .then((res) => resolve(res.data))
        .catch((err: AxiosError) => reject(err));
    });
  }
}
