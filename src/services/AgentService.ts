import supabase from "../infra/supabase/connect";

  class AgentService {

  async getAllByAgent(agent: string | undefined) {
    const { data, error } = await supabase
      .from("systems")
      .select("*")
      .eq("agent", agent);

    if (error) throw new Error(error.message);
    return data;
  }
}
export default new AgentService();