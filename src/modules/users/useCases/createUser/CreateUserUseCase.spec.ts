import { AppError } from "../../../../shared/errors/AppError";
import { InMemoryUsersRepository } from "../../repositories/in-memory/InMemoryUsersRepository";
import { CreateUserUseCase } from "./CreateUserUseCase";

let createUserUseCase: CreateUserUseCase;
let inMemoryUsersRepository: InMemoryUsersRepository;

describe("Create user", () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    createUserUseCase = new CreateUserUseCase(inMemoryUsersRepository);
  });

  it("Should be able to create a new user.", async () => {
    const user = await createUserUseCase.execute({
      email: "username@email.com",
      name: "username",
      password: "1234",
    });

    expect(user).toHaveProperty("id");
  });

  it("Should not be able to create a new user with an existing email.", async () => {
    expect(async () => {
      const user = {
        email: "username@email.com",
        name: "username",
        password: "1234",
      };

      await createUserUseCase.execute({
        email: user.email,
        name: user.name,
        password: user.password,
      });
      await createUserUseCase.execute({
        email: user.email,
        name: user.name,
        password: user.password,
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
