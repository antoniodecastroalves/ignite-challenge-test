import { InMemoryUsersRepository } from "../../repositories/in-memory/InMemoryUsersRepository";
import { ICreateUserDTO } from "../createUser/ICreateUserDTO";
import { ShowUserProfileUseCase } from "./ShowUserProfileUseCase";

let usersRepositoryInMemory: InMemoryUsersRepository;
let showUserProfileUseCase: ShowUserProfileUseCase;

describe("Show user profile", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new InMemoryUsersRepository();
    showUserProfileUseCase = new ShowUserProfileUseCase(usersRepositoryInMemory);
  });

  it("Should be able to show an user profile", async () => {
    const user = await usersRepositoryInMemory.create({
      name: "username",
      email: "username@email.com",
      password: "1234",
    });

    const result = await showUserProfileUseCase.execute(
      user.id as string
    );

    expect(user).toEqual(result);
  });
});
